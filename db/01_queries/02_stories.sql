SELECT * FROM stories;


SELECT title, content, theme_id, dtory, image, status 
FROM  stories
JOIN themes ON themes(id) = theme_id
-- JOIN user_contributions ON stories(id) = id;

SELECT title, content, theme_id, dtory, image, status 
FROM  stories
JOIN favourite-stories ON favourite-stories(id) = id;

INSERT INTO stories (user_id, title, content, created_at, story_image, theme_id)
VALUES (2, 'title1', 'contentcontentstory1', NOW(), '1254', 1);
`$1, $2, $3,  NOW(), $4, $5) returning *`;


