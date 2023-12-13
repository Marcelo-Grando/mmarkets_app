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
CREATE TABLE employes (
    employee_id VARCHAR(12) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    lastname VARCHAR(150) NOT NULL,
    dni INT(10) UNSIGNED UNIQUE NOT NULL,
    email VARCHAR(250) UNIQUE NOT NULL,
    position VARCHAR(50) NOT NULL,
    market_id VARCHAR(12) NOT NULL,
    FOREIGN KEY (market_id) REFERENCES markets(market_id),
    FOREIGN KEY (employe_id) REFERENCES users(user_id)
);
CREATE TABLE categories (
    category_id VARCHAR(12) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    market_id VARCHAR(12) NOT NULL,
    created DATETIME,
    FOREIGN KEY (market_id) REFERENCES markets(market_id)
);
CREATE TABLE products (
    product_id VARCHAR(12) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    expiration DATE,
    category_id VARCHAR(12) NOT NULL,
    market_id VARCHAR(12) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    FOREIGN KEY (market_id) REFERENCES markets(market_id)
);
CREATE TABLE sales (
    sale_id VARCHAR(12) PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    market_id VARCHAR(12) NOT NULL,
    employee_id VARCHAR(12) NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (market_id) REFERENCES markets(market_id)
);
CREATE TABLE items_for_sales (
    item_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    quantify INT UNSIGNED NOT NULL,
    sale_id VARCHAR(12) NOT NULL,
    product_id VARCHAR(12) NOT NULL,
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