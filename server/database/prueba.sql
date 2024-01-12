call make_sale('d12tyu03i2', 'ghj3910io', '[{"product_id":"df09onm23","quantify":2},{"product_id":"kl239udi","quantify":1}]', 2000, 'kfc203ls2m');

CALL calculateTotalSale('[{"product_id":"df09onm23","quantify":2},{"product_id":"kl239udi","quantify":1}]');

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

 DELIMITER $
 CREATE PROCEDURE calculateTotalSale (
    _products JSON,
    _market_id VARCHAR(12)
 )
 BEGIN
    DECLARE product_price DECIMAL(10, 2);
START TRANSACTION;
    SET @counter = 0;
    SET @amount = 0;
    SET @product_id = '';
    WHILE @counter < json_length(_products) DO
        SELECT json_extract(_products, concat('$[', @counter, ']')) INTO @row_data;
        SET @product_id = (SELECT REPLACE(json_extract(@row_data, '$.product_id'), '"', ''));
        SET product_price = (SELECT p.price FROM products p WHERE p.product_id = @product_id AND p.market_id = _market_id);
        SET @amount = @amount + product_price * json_extract(@row_data, '$.quantify');
        SET @counter = @counter + 1;
        SET @product_id = '';
    END WHILE;
    SELECT @amount AS amount; 
    COMMIT;
 END $
 DELIMITER ;
