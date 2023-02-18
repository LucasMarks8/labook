-- Active: 1675122567092@@127.0.0.1@3306

DROP TABLE posts;

DROP TABLE users;

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role ENUM NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL
    );

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
    );

CREATE TABLE
    likes_dislikes (
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (post_id) REFERENCES posts (id)
    );

INSERT INTO posts (id, creator_id, content, likes, dislikes) 
VALUES
    ("p001", "u001", "Você é nota 10", 0, 0),
    ("p002", "u002", "Hoje vou para a praia", 0, 0),
    ("p003", "u003", "Hoje vou ao estádio com meu irmão", 0, 0);

INSERT INTO users (id, name, email, password, role)
VALUES
    ("u001", "Lucas", "lucas@email.com", "Lucas123!", "ADMIN"),
    ("u002", "André", "andre@email.com", "Andre123!", "NORMAL"),
    ("u003", "Juliana", "juliana@email.com", "Juliana123!", "NORMAL");

SELECT * FROM posts;

SELECT * FROM users;