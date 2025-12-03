
CREATE TABLE user_preferences (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL UNIQUE,
  language TEXT DEFAULT 'pt-BR',
  notify_new_releases BOOLEAN DEFAULT 0,
  notify_promotions BOOLEAN DEFAULT 0,
  notify_booking_confirmations BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);
