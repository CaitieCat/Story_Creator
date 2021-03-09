SELECT * FROM user_contributions;

SELECT users.user_name, stories.title, accepted
FROM user_contributions
JOIN users ON users(id) = user_id AND
JOIN  ON stories(id) = id;

SELECT users.user_name, stories.title, accepted
FROM user_contributions
JOIN upvotes ON upvotes(user_id) = user_id AND
upvotes.user_contributions_id = story_id;

INSERT INTO user_contributions (story_id, user_id, contribution,contributed_at, accepted) 
VALUES (`$1, $2, $3, NOW(), FALSE) returning *`;