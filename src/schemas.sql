CREATE DATABASE IF NOT EXISTS bort;
USE bort;

CREATE TABLE IF NOT EXISTS user (
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(32) UNIQUE,
    password_hash VARCHAR(64) NOT NULL,
    privilege_level ENUM("user", "admin") DEFAULT "user",
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) engine=innodb;
