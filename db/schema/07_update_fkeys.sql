ALTER TABLE stories 
DROP COLUMN theme_id;

ALTER TABLE stories 
ADD COLUMN theme_id INTEGER REFERENCES story_themes(id) ON DELETE CASCADE;

ALTER TABLE story_themes 
DROP COLUMN story_id;

ALTER TABLE story_themes 
ADD COLUMN story_id INTEGER REFERENCES stories(id) ON DELETE CASCADE;

