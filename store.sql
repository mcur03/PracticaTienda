CREATE DATABASE store;
USE store;
CREATE TABLE users(
	id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(80) NOT NULL,
    pass VARCHAR(100) NOT NULL,
    rol ENUM('admin','client')
);
select * from users;

CREATE TABLE product(
	id INT AUTO_INCREMENT PRIMARY KEY,
    image_url LONGBLOB,
    nameP VARCHAR(50) NOT NULL,
    descriptionP TEXT NOT NULL,
    price DECIMAL(10,2)
);

CREATE TABLE comments(
	id INT AUTO_INCREMENT PRIMARY KEY,
    commentP TEXT,
    id_user INT,
    id_product INT
);

-- select * from  users;
select * from  product;