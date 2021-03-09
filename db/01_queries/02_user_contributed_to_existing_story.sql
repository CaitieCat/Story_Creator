SELECT users.user_name, stories.title, 
FROM  users
JOIN stories ON users(id) = user_id AND
JOIN user_contributions ON stories(id) = id;

SELECT * FROM stories;
SELECT * FROM user_contributions;
INSERT INTO user_contributions (story_id, user_id, contribution,contributed_at, accepted) 
VALUES (1, 1, 'contributioncontributionstory2', NOW(), FALSE);