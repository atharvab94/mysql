DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
id INT NOT NULL AUTO_INCREMENT,
product VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NULL,
    quanity INT NULL,
    PRIMARY KEY (id)

);


INSERT INTO products (product, department, price, quanity)
VALUES ("icecream", "foods", 9, 54);

INSERT INTO products (product, department, price, quanity)
VALUES ("mint", "foods", 2, 100);

INSERT INTO products (product, department, price, quanity)
VALUES ("iphonex", "phones", 400, 44);


INSERT INTO products (product, department, price, quanity)
VALUES ("hp Laptop", "desktops", 900, 15);

INSERT INTO products (product, department, price, quanity)
VALUES ("sony 55", "televisions", 300, 10);

