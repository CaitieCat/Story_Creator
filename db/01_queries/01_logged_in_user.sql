SELECT user_name, user_email, profile_pic_path
FROM users
WHERE user_email = 'Alice@alice.com';

SELECT * FROM users;

INSERT INTO users(user_name, user_email, password, profile_pic_path)
VALUES (`$1, $2, $3, $4) returning *`;