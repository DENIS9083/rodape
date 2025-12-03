import z from "zod";

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  poster_url: z.string().nullable(),
  backdrop_url: z.string().nullable(),
  release_date: z.string().nullable(),
  duration_minutes: z.number().nullable(),
  rating: z.string().nullable(),
  genre: z.string().nullable(),
  director: z.string().nullable(),
  cast: z.string().nullable(),
  is_now_showing: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Movie = z.infer<typeof MovieSchema>;

export const ShowtimeSchema = z.object({
  id: z.number(),
  movie_id: z.number(),
  theater_name: z.string(),
  show_date: z.string(),
  show_time: z.string(),
  price: z.number().nullable(),
  available_seats: z.number().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Showtime = z.infer<typeof ShowtimeSchema>;

export const MovieWithShowtimes = MovieSchema.extend({
  showtimes: z.array(ShowtimeSchema),
});

export type MovieWithShowtimes = z.infer<typeof MovieWithShowtimes>;

export const FoodItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  category: z.string(),
  price: z.number(),
  image_url: z.string().nullable(),
  is_available: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type FoodItem = z.infer<typeof FoodItemSchema>;

export const BookingFoodItemSchema = z.object({
  food_item_id: z.number(),
  quantity: z.number(),
});

export type BookingFoodItem = z.infer<typeof BookingFoodItemSchema>;

export const CreateBookingSchema = z.object({
  showtime_id: z.number(),
  customer_name: z.string().min(1),
  customer_email: z.string().email(),
  customer_phone: z.string().optional(),
  num_tickets: z.number().min(1),
  food_items: z.array(BookingFoodItemSchema).optional(),
});

export type CreateBooking = z.infer<typeof CreateBookingSchema>;

export const BookingSchema = z.object({
  id: z.number(),
  showtime_id: z.number(),
  customer_name: z.string(),
  customer_email: z.string(),
  customer_phone: z.string().nullable(),
  num_tickets: z.number(),
  total_price: z.number(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Booking = z.infer<typeof BookingSchema>;
