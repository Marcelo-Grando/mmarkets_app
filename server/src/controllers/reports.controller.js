import { pool } from "../db.js";
import { tryCatch } from "../utils/tryCatch.js";

export const getSoldProducts = tryCatch(async (req, res) => {
  const { market_id } = req.params;

  const [sold_products] = await pool.query(
    "SELECT * FROM sold_products WHERE market_id = ?",
    [market_id]
  );
  const [tickets] = await pool.query(
    "SELECT * FROM tickets WHERE market_id = ?",
    [market_id]
  );

  const [salesByProducts] = await pool.query(
    "SELECT product_id, name, description, category_name, sum(price * quantify) AS amount FROM sold_products WHERE market_id = ? GROUP BY product_id, name, description, category_name",
    [market_id]
  );

  const [salesByCategories] = await pool.query(
    "SELECT category_name, sum(price * quantify) AS amount FROM sold_products WHERE market_id = ? GROUP BY category_name",
    [market_id]
  );

  const [salesBySellers] = await pool.query(
    "SELECT employee_id, employee_name, sum(price * quantify) AS amount FROM sold_products WHERE market_id = ? GROUP BY employee_id, employee_name",
    [market_id]
  );

  res.json({ salesByProducts, salesByCategories, salesBySellers });
});

export const salesByProducts = tryCatch(async (req, res) => {
  const { market_id } = req.params;

  const [salesByProducts] = await pool.query(
    "SELECT product_id, name, description, category_name, sum(price * quantify) AS amount, SUM(quantify) AS quantify FROM sold_products WHERE market_id = ? GROUP BY product_id, name, description, category_name",
    [market_id]
  );

  res.json(salesByProducts);
});

export const salesByCategories = tryCatch(async (req, res) => {
  const { market_id } = req.params;

  const [salesByCategories] = await pool.query(
    "SELECT category_name, sum(price * quantify) AS amount, SUM(quantify) AS quantify FROM sold_products WHERE market_id = ? GROUP BY category_name",
    [market_id]
  );

  res.json(salesByCategories);
});

export const salesBySellers = tryCatch(async (req, res) => {
  const { market_id } = req.params;

  const [salesBySellers] = await pool.query(
    "SELECT employee_id, employee_name, sum(price * quantify) AS amount FROM sold_products WHERE market_id = ? GROUP BY employee_id, employee_name",
    [market_id]
  );

  const [sales_total] = await pool.query(
    "SELECT employee_name, COUNT(ticket_id) AS sales_total FROM sold_products WHERE market_id = ? GROUP BY employee_name",
    [market_id]
  );

  res.json({ ...salesBySellers, sales: sales_total });
});

export const salesByDay = tryCatch(async (req, res) => {
  const { market_id, date } = req.params;

  const [[dailySalesCumulative]] = await pool.query(
    "SELECT SUM(s.price * s.quantify) AS total, t.date FROM sold_products s INNER JOIN tickets t ON s.ticket_id = t.ticket_id WHERE s.market_id = ? AND t.date = ? GROUP BY t.date",
    [market_id, date]
  );

  const [dailySalesByProduct] = await pool.query(
    "SELECT s.product_id, s.name, s.description, s.category_name, SUM(s.price * s.quantify) AS amount, SUM(s.quantify) AS quantify, t.date FROM sold_products s INNER JOIN tickets t ON s.ticket_id = t.ticket_id WHERE s.market_id = ? AND t.date = ? GROUP BY s.product_id, s.name, s.description, s.category_name, t.date",
    [market_id, date]
  );

  const [dailySalesByCategory] = await pool.query(
    "SELECT s.category_name, SUM(s.price * s.quantify) AS amount, SUM(s.quantify) AS quantify, t.date FROM sold_products s INNER JOIN tickets t ON s.ticket_id = t.ticket_id WHERE s.market_id = ? AND t.date = ? GROUP BY s.category_name, t.date",
    [market_id, date]
  );

  res.json({ dailySalesCumulative, dailySalesByProduct, dailySalesByCategory });
});


