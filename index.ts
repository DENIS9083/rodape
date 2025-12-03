import { Hono } from "hono";
import { cors } from "hono/cors";
import { getCookie, setCookie } from "hono/cookie";
import {
  exchangeCodeForSessionToken,
  getOAuthRedirectUrl,
  authMiddleware,
  deleteSession,
  MOCHA_SESSION_TOKEN_COOKIE_NAME,
} from "@getmocha/users-service/backend";
import { CreateBookingSchema } from "@/shared/types";

const app = new Hono<{ Bindings: Env }>();

app.use("/*", cors());

// Auth endpoints
app.get("/api/oauth/google/redirect_url", async (c) => {
  const redirectUrl = await getOAuthRedirectUrl("google", {
    apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
  });

  return c.json({ redirectUrl }, 200);
});

app.post("/api/sessions", async (c) => {
  const body = await c.req.json();

  if (!body.code) {
    return c.json({ error: "No authorization code provided" }, 400);
  }

  const sessionToken = await exchangeCodeForSessionToken(body.code, {
    apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
  });

  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: true,
    maxAge: 60 * 24 * 60 * 60, // 60 days
  });

  return c.json({ success: true }, 200);
});

app.get("/api/users/me", authMiddleware, async (c) => {
  return c.json(c.get("user"));
});

app.get("/api/logout", async (c) => {
  const sessionToken = getCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME);

  if (typeof sessionToken === "string") {
    await deleteSession(sessionToken, {
      apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
      apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
    });
  }

  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, "", {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: true,
    maxAge: 0,
  });

  return c.json({ success: true }, 200);
});

// Get all movies
app.get("/api/movies", async (c) => {
  const db = c.env.DB;
  const movies = await db
    .prepare("SELECT * FROM movies ORDER BY is_now_showing DESC, release_date DESC")
    .all();
  
  return c.json(movies.results);
});

// Get single movie with showtimes
app.get("/api/movies/:id", async (c) => {
  const db = c.env.DB;
  const id = c.req.param("id");
  
  const movie = await db
    .prepare("SELECT * FROM movies WHERE id = ?")
    .bind(id)
    .first();
  
  if (!movie) {
    return c.json({ error: "Movie not found" }, 404);
  }
  
  const showtimes = await db
    .prepare("SELECT * FROM showtimes WHERE movie_id = ? ORDER BY show_date, show_time")
    .bind(id)
    .all();
  
  return c.json({
    ...movie,
    showtimes: showtimes.results,
  });
});

// Get showtimes for a specific date
app.get("/api/showtimes", async (c) => {
  const db = c.env.DB;
  const date = c.req.query("date");
  
  let query = "SELECT * FROM showtimes";
  const params: string[] = [];
  
  if (date) {
    query += " WHERE show_date = ?";
    params.push(date);
  }
  
  query += " ORDER BY show_date, show_time";
  
  const stmt = db.prepare(query);
  const showtimes = await (params.length > 0 ? stmt.bind(...params) : stmt).all();
  
  return c.json(showtimes.results);
});

// Get all food items
app.get("/api/food-items", async (c) => {
  const db = c.env.DB;
  const foodItems = await db
    .prepare("SELECT * FROM food_items WHERE is_available = 1 ORDER BY category, name")
    .all();
  
  return c.json(foodItems.results);
});

// Create booking
app.post("/api/bookings", async (c) => {
  const db = c.env.DB;
  
  try {
    const body = await c.req.json();
    const data = CreateBookingSchema.parse(body);
    
    // Get showtime details
    const showtime = await db
      .prepare("SELECT * FROM showtimes WHERE id = ?")
      .bind(data.showtime_id)
      .first();
    
    if (!showtime) {
      return c.json({ error: "Showtime not found" }, 404);
    }
    
    // Check available seats
    if (showtime.available_seats !== null && showtime.available_seats < data.num_tickets) {
      return c.json({ error: "Not enough seats available" }, 400);
    }
    
    // Calculate total price
    let totalPrice = (showtime.price || 0) * data.num_tickets;
    
    // Add food items to total
    const foodItemPrices: Array<{ id: number; price: number; quantity: number }> = [];
    if (data.food_items && data.food_items.length > 0) {
      for (const item of data.food_items) {
        const foodItem = await db
          .prepare("SELECT price FROM food_items WHERE id = ? AND is_available = 1")
          .bind(item.food_item_id)
          .first();
        
        if (foodItem) {
          totalPrice += foodItem.price * item.quantity;
          foodItemPrices.push({
            id: item.food_item_id,
            price: foodItem.price,
            quantity: item.quantity,
          });
        }
      }
    }
    
    // Create booking
    const bookingResult = await db
      .prepare(
        "INSERT INTO bookings (showtime_id, customer_name, customer_email, customer_phone, num_tickets, total_price, status) VALUES (?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(
        data.showtime_id,
        data.customer_name,
        data.customer_email,
        data.customer_phone || null,
        data.num_tickets,
        totalPrice,
        "confirmed"
      )
      .run();
    
    const bookingId = bookingResult.meta.last_row_id;
    
    // Add food items to booking
    if (foodItemPrices.length > 0) {
      for (const item of foodItemPrices) {
        await db
          .prepare(
            "INSERT INTO booking_food_items (booking_id, food_item_id, quantity, unit_price) VALUES (?, ?, ?, ?)"
          )
          .bind(bookingId, item.id, item.quantity, item.price)
          .run();
      }
    }
    
    // Update available seats
    if (showtime.available_seats !== null) {
      await db
        .prepare("UPDATE showtimes SET available_seats = available_seats - ? WHERE id = ?")
        .bind(data.num_tickets, data.showtime_id)
        .run();
    }
    
    // Fetch created booking
    const booking = await db
      .prepare("SELECT * FROM bookings WHERE id = ?")
      .bind(bookingId)
      .first();
    
    return c.json(booking, 201);
  } catch (error) {
    console.error("Booking error:", error);
    return c.json({ error: "Failed to create booking" }, 500);
  }
});

// Get user preferences
app.get("/api/user-preferences", authMiddleware, async (c) => {
  const db = c.env.DB;
  const user = c.get("user");
  
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  
  let preferences = await db
    .prepare("SELECT * FROM user_preferences WHERE user_id = ?")
    .bind(user.id)
    .first();
  
  // Create default preferences if they don't exist
  if (!preferences) {
    await db
      .prepare(
        "INSERT INTO user_preferences (user_id, language, notify_new_releases, notify_promotions, notify_booking_confirmations) VALUES (?, ?, ?, ?, ?)"
      )
      .bind(user.id, "pt-BR", 0, 0, 1)
      .run();
    
    preferences = await db
      .prepare("SELECT * FROM user_preferences WHERE user_id = ?")
      .bind(user.id)
      .first();
  }
  
  return c.json(preferences);
});

// Update user preferences
app.put("/api/user-preferences", authMiddleware, async (c) => {
  const db = c.env.DB;
  const user = c.get("user");
  
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  
  const body = await c.req.json();
  
  const {
    language,
    notify_new_releases,
    notify_promotions,
    notify_booking_confirmations,
  } = body;
  
  await db
    .prepare(
      `UPDATE user_preferences 
       SET language = ?, 
           notify_new_releases = ?, 
           notify_promotions = ?, 
           notify_booking_confirmations = ?,
           updated_at = CURRENT_TIMESTAMP
       WHERE user_id = ?`
    )
    .bind(
      language,
      notify_new_releases ? 1 : 0,
      notify_promotions ? 1 : 0,
      notify_booking_confirmations ? 1 : 0,
      user.id
    )
    .run();
  
  const preferences = await db
    .prepare("SELECT * FROM user_preferences WHERE user_id = ?")
    .bind(user.id)
    .first();
  
  return c.json(preferences);
});

// Delete user account
app.delete("/api/user-account", authMiddleware, async (c) => {
  const db = c.env.DB;
  const user = c.get("user");
  
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  
  // Delete user preferences
  await db
    .prepare("DELETE FROM user_preferences WHERE user_id = ?")
    .bind(user.id)
    .run();
  
  // Delete user bookings and related data
  const bookings = await db
    .prepare("SELECT id FROM bookings WHERE customer_email = ?")
    .bind(user.email)
    .all();
  
  for (const booking of bookings.results) {
    await db
      .prepare("DELETE FROM booking_food_items WHERE booking_id = ?")
      .bind(booking.id)
      .run();
  }
  
  await db
    .prepare("DELETE FROM bookings WHERE customer_email = ?")
    .bind(user.email)
    .run();
  
  // Log out the user
  const sessionToken = getCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME);
  
  if (typeof sessionToken === "string") {
    await deleteSession(sessionToken, {
      apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
      apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
    });
  }
  
  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, "", {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: true,
    maxAge: 0,
  });
  
  return c.json({ success: true });
});

// Get booking by ID
app.get("/api/bookings/:id", async (c) => {
  const db = c.env.DB;
  const id = c.req.param("id");
  
  const booking = await db
    .prepare(`
      SELECT 
        b.*,
        m.title as movie_title,
        s.show_date,
        s.show_time,
        s.theater_name
      FROM bookings b
      LEFT JOIN showtimes s ON b.showtime_id = s.id
      LEFT JOIN movies m ON s.movie_id = m.id
      WHERE b.id = ?
    `)
    .bind(id)
    .first();
  
  if (!booking) {
    return c.json({ error: "Booking not found" }, 404);
  }
  
  // Get food items for this booking
  const foodItems = await db
    .prepare(`
      SELECT 
        fi.name,
        bfi.quantity,
        bfi.unit_price
      FROM booking_food_items bfi
      LEFT JOIN food_items fi ON bfi.food_item_id = fi.id
      WHERE bfi.booking_id = ?
    `)
    .bind(id)
    .all();
  
  return c.json({
    ...booking,
    food_items: foodItems.results,
  });
});

export default app;
