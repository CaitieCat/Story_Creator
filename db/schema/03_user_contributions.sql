DROP TABLE IF EXISTS user_contributions CASCADE;

CREATE TABLE user_contributions(
  id SERIAL PRIMARY KEY NOT NULL,
  story_id INTEGER REFERENCES stories(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  contribution TEXT NOT NULL,
  contributed_at TIMESTAMP,
  accepted BOOLEAN NOT NULL DEFAULT FALSE
);