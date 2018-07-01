DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	department_name VARCHAR(255) NULL,
	price DECIMAL(10,2) NULL,
	stock INTEGER(10) NULL,
	PRIMARY KEY(id)
);

SELECT * FROM products;