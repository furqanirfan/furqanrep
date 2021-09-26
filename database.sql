CREATE EXTENSION  IF NOT EXISTS "uuid-ossp";

CREATE DATABASE jwt;

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL UNIQUE,
    user_password TEXT NOT NULL
);

SELECT * FROM users;

INSERT INTO users (user_name,user_email,user_password) VALUES ('Furqan','furqi.irfan@gmail.com','furqan');
INSERT INTO users (user_name,user_email,user_password) VALUES ('Adnan','adnan.irfan@gmail.com','adnan');

--psql -U postgres  