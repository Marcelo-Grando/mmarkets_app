CREATE DATABASE mmarkets_app;
USE mmarquets_app;
CREATE TABLE markets (
    market_id VARCHAR(12) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    adress VARCHAR(250) NOT NULL,
    state BOOLEAN NOT NULL,
    email VARCHAR(250) UNIQUE NOT NULL
);
CREATE TABLE users (
    user_id VARCHAR(12) PRIMARY KEY,
    email VARCHAR(250) UNIQUE NOT NULL,
    roles VARCHAR(250) NOT NULL,
    password BLOB NOT NULL,
    market_id VARCHAR(12) NOT NULL,
    FOREIGN KEY (market_id) REFERENCES markets(market_id)
);
CREATE TABLE employees (
    employee_id VARCHAR(12) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    lastname VARCHAR(150) NOT NULL,
    dni INT(10) UNSIGNED UNIQUE NOT NULL,
    email VARCHAR(250) UNIQUE NOT NULL,
    position VARCHAR(50) NOT NULL,
    market_id VARCHAR(12) NOT NULL,
    FOREIGN KEY (market_id) REFERENCES markets(market_id),
    FOREIGN KEY (employee_id) REFERENCES users(user_id)
);
CREATE TABLE categories (
    category_id VARCHAR(12) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    market_id VARCHAR(12) NOT NULL,
    created DATETIME,
    FOREIGN KEY (market_id) REFERENCES markets(market_id)
);
CREATE TABLE products (
    product_id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    expiration DATE,
    category_id VARCHAR(12) NOT NULL,
    market_id VARCHAR(12) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    FOREIGN KEY (market_id) REFERENCES markets(market_id)
);
CREATE TABLE payment_type (
    payment_type_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    tax_rate INT UNSIGNED,
    market_id VARCHAR(12),
    FOREIGN KEY (market_id) REFERENCES markets(market_id)
);
CREATE TABLE sales (
    sale_id VARCHAR(12) PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    market_id VARCHAR(12) NOT NULL,
    employee_id VARCHAR(12) NOT NULL,
    payment_type INT UNSIGNED,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (market_id) REFERENCES markets(market_id),
    FOREIGN KEY (payment_type) REFERENCES payment_type(payment_type_id)
);
CREATE TABLE items_for_sales (
    item_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    quantify INT UNSIGNED NOT NULL,
    sale_id VARCHAR(12) NOT NULL,
    product_id VARCHAR(100) NOT NULL,
    market_id VARCHAR(12) NOT NULL,
    FOREIGN KEY (sale_id) REFERENCES sales(sale_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (market_id) REFERENCES markets(market_id)
);
CREATE TABLE tickets (
    ticket_id VARCHAR(12) NOT NULL PRIMARY KEY,
    products TEXT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    sale_id VARCHAR(12) NOT NULL,
    employee_id VARCHAR(12) NOT NULL,
    employee_email VARCHAR(250),
    market_id VARCHAR(12) NOT NULL,
    market_name VARCHAR(100),
    FOREIGN KEY (market_id) REFERENCES markets(market_id)
);
CREATE TABLE sold_products (
    sold_product_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(12),
    name VARCHAR(100) NOT NULL,
    description VARCHAR(100) NOT NULL,
    category_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantify INT UNSIGNED NOT NULL,
    ticket_id VARCHAR(12) NOT NULL,
    employee_id VARCHAR(12) NOT NULL,
    market_id VARCHAR(12) NOT NULL,
    FOREIGN KEY (ticket_id) REFERENCES tickets(ticket_id),
    FOREIGN KEY (market_id) REFERENCES markets(market_id)
);
CREATE VIEW accounts_employees_view AS
SELECT u.user_id,
    u.email,
    u.roles,
    e.name,
    e.lastname,
    e.dni,
    e.market_id
FROM users u
    INNER JOIN employees e ON u.user_id = e.employee_id;

DELIMITER $
CREATE PROCEDURE createMainAccount (
    _market_id VARCHAR(12),
    _name VARCHAR(150),
    _adress VARCHAR(250),
    _state BOOLEAN,
    _email VARCHAR(250),
    _password BLOB
)
    BEGIN 
        INSERT INTO markets (market_id, name, adress, state, email)
        VALUES
        (_market_id, _name, _adress, _state, _email);
        INSERT INTO users (user_id, email, roles, password, market_id)
        VALUES
        (_market_id, _email, 'main', _password, _market_id);
    SELECT 'Account created successfully' AS message;
    COMMIT;
END $
DELIMITER ;

DELIMITER $
CREATE PROCEDURE createEmployeeAccount (
    _employee_id VARCHAR(12),
    _market_id VARCHAR(12),
    _email VARCHAR(250),
    _name VARCHAR(100),
    _lastname VARCHAR(100),
    _dni INT UNSIGNED,
    _position VARCHAR(20),
    _password BLOB
)
    BEGIN
        INSERT INTO users (user_id, email, roles, password, market_id)
        VALUES
        (_employee_id, _email, _position, _password, _market_id);
        INSERT INTO employees (employee_id, name, lastname, dni, email, position, market_id)
        VALUES
        (_employee_id, _name, _lastname, _dni, _email, _position, _market_id);
    SELECT 'Account created successfully' AS message;
    COMMIT;
END $
DELIMITER ;

DELIMITER $
CREATE PROCEDURE make_sale (
     _market_id VARCHAR(12),
     _employee_id VARCHAR(12),
     _products JSON,
     _amount DECIMAL(10, 2),
     _sale_id VARCHAR(12)
 )
 BEGIN
     DECLARE date_now DATE;
     DECLARE time_now TIME;
     DECLARE employee_email VARCHAR(250);
     DECLARE market_name VARCHAR(100);
     DECLARE product_id VARCHAR(100);
     DECLARE product_name VARCHAR(100);
     DECLARE product_description VARCHAR(100);
     DECLARE category_name VARCHAR(100);
     DECLARE product_price DECIMAL(10, 2);
 START TRANSACTION;
     SET employee_email = (SELECT email FROM users WHERE user_id = _employee_id);
     SET market_name = (SELECT name FROM markets WHERE market_id = _market_id);
     SET date_now = (SELECT DATE(NOW()));
     SET time_now = (SELECT TIME(NOW()));
     INSERT INTO sales (sale_id, amount, date, time, market_id, employee_id)
     VALUES
     (_sale_id, _amount, date_now, time_now, _market_id, _employee_id);
     INSERT INTO tickets (ticket_id, products, amount, date, time, sale_id, employee_id, employee_email, market_id, market_name)
     VALUES
     (_sale_id, _products, _amount, date_now, time_now, _sale_id, _employee_id, employee_email, _market_id, market_name);
     SET @counter = 0;
     SET @product_id = '';
     WHILE @counter < json_length(_products) DO
        SELECT json_extract(_products, concat('$[', @counter, ']')) INTO @row_data;
        SET @product_id = (SELECT REPLACE(json_extract(@row_data, '$.product_id'), '"', ''));
        SET product_name = (SELECT p.name FROM products p WHERE p.product_id = @product_id AND p.market_id = _market_id);
        SET product_description = (SELECT p.description FROM products p WHERE p.product_id = @product_id AND p.market_id = _market_id);
        SET category_name = (SELECT c.name FROM products p INNER JOIN categories c
        ON p.category_id = c.category_id WHERE p.product_id = @product_id AND p.market_id = _market_id);
        SET product_price = (SELECT p.price FROM products p WHERE p.product_id = @product_id AND p.market_id = _market_id);
        INSERT INTO items_for_sales (quantify, sale_id, product_id, market_id)
        VALUES
        (json_extract(@row_data, '$.quantify'), _sale_id, REPLACE(json_extract(@row_data, '$.product_id'), '"', ''), _market_id);
        INSERT INTO sold_products (product_id, name, description, category_name, price, quantify, ticket_id, employee_id, market_id)
        VALUES
        (@product_id, product_name, product_description, category_name, product_price, json_extract(@row_data, '$.quantify'), _sale_id, _employee_id, _market_id);
     SET @counter = @counter + 1;
     SET @product_id = '';
     END WHILE;
     SELECT * FROM tickets WHERE sale_id = _sale_id;
     COMMIT;
 END $
 DELIMITER ;