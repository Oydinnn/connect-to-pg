SELECT * FROM users;

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  description VARCHAR(100),
  user_id INT REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO posts (title, description, user_id)
VALUES 
('My first post', 'This is my first post', 1),
('second post', 'this is my second post', 1)
;

SELECT * FROM posts;

SELECT *
FROM information_schema.columns
WHERE table_name = 'posts';




