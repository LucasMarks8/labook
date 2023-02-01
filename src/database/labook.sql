-- Active: 1675122567092@@127.0.0.1@3306

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
        likes BOOLEAN,
        dislikes BOOLEAN,
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
    ("p001", "u001", "Você é nota 10", true, false),
    ("p002", "u002", "Hoje vou para a praia", false, true),
    ("p003", "u003", "Hoje vou ao estádio com meu irmão", true, false);

INSERT INTO users (id, name, email, password, role)
VALUES
    ("u001", "Lucas", "lucas@email.com", "lucas123", "ADMIN"),
    ("u002", "André", "andre@email.com", "andre123", "NORMAL"),
    ("u003", "Juliana", "juliana@email.com", "juliana123", "NORMAL");

SELECT * FROM posts;

SELECT * FROM users;