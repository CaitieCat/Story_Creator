DROP TABLE IF EXISTS stories CASCADE;

CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  theme_id INTEGER,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP,
  story_image VARCHAR(255),
  story_status BOOLEAN
);


