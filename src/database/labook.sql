-- Active: 1677017806866@@127.0.0.1@3306

DROP TABLE posts;

DROP TABLE users;

DROP TABLE likes_dislikes;

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role ENUM NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL
    );

    INSERT INTO users (id, name, email, password, role)
VALUES
    ("u001", "Lucas", "lucas@email.com", "Lucas123!", "ADMIN"),
    ("u002", "André", "andre@email.com", "Andre123!", "NORMAL"),
    ("u003", "Juliana", "juliana@email.com", "Juliana123!", "NORMAL");

CREATE TABLE
    posts (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER,
        dislikes INTEGER,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users(id)
                ON DELETE CASCADE
                ON UPDATE CASCADE
    );

    
INSERT INTO posts (id, creator_id, content) 
VALUES
    ("p001", "u001", "Você é nota 10"),
    ("p002", "u002", "Hoje vou para a praia"),
    ("p003", "u003", "Hoje vou ao estádio com meu irmão");

CREATE TABLE
    likes_dislikes (
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts (id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
    );

INSERT INTO likes_dislikes (user_id, post_id, like)
    VALUES
    ("u002", "p001", 1),
    ("u003", "p001", 1),
    ("u002", "p002", 1),
    ("u003", "p002", 1),
    ("u001", "p003", 1),
    ("u003", "p003", 0);

UPDATE posts
SET likes = 2
WHERE id = "p001";

UPDATE posts
SET likes = 2
WHERE id = "p002";

UPDATE posts
SET likes = 1
WHERE id = "p003";

UPDATE posts
SET dislikes = 1
WHERE id = "p003";

SELECT
    posts.id,
    posts.creator_id,
    posts.content,
    posts.likes,
    posts.dislikes,
    posts.created_at,
    posts.updated_at,
    users.name AS creator_name
FROM posts
JOIN users
ON posts.creator_id = users.id;


SELECT * FROM posts;
SELECT * FROM users;
SELECT * FROM likes_dislikes;