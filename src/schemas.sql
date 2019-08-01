CREATE DATABASE IF NOT EXISTS bort;
USE bort;

CREATE TABLE IF NOT EXISTS user (
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(32) UNIQUE,
    password_hash VARCHAR(64) NOT NULL,
    privilege_level ENUM("user", "admin") DEFAULT "user",
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) engine=innodb;

CREATE TABLE IF NOT EXISTS thread (
    thread_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    thread_title VARCHAR(32) UNIQUE,
    user_id INT NOT NULL,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)
        REFERENCES user(user_id)
        ON DELETE CASCADE
) engine=innodb;

CREATE TABLE IF NOT EXISTS post (
    post_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id  INT NOT NULL,
    thread_id INT NOT NULL,
    post_body TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)
        REFERENCES user(user_id)
        ON DELETE CASCADE,
    FOREIGN KEY (thread_id)
        REFERENCES thread(thread_id)
        ON DELETE CASCADE,
) engine=innodb;
