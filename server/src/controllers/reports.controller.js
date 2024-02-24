import { pool } from "../db.js";
import { tryCatch } from "../utils/tryCatch.js";

export const getTickets = tryCatch(async (req, res) => {
  const {market_id} = req.params

  const [tickets] = await pool.query("SELECT ticket_id, JSON_EXTRACT(products, '$') AS products, amount, date, time, payment_type, employee_id, employee_email, market_id, market_name FROM tickets WHERE market_id = ? ORDER BY date DESC, time DESC", [market_id])

  res.json(tickets)
}) 

export const salesByProducts = tryCatch(async (req, res) => {
  const { market_id } = req.params;

  const [salesByProducts] = await pool.query(
    "SELECT product_id, name, description, category_name, sum(price * quantify) AS amount, SUM(quantify) AS quantify FROM sold_products WHERE market_id = ? GROUP BY product_id, name, description, category_name",
    [market_id]
  );

  const [reports] = await pool.query("CALL getReports2(?)", [market_id])

  res.json({salesByProducts: reports[0], salesByCategories: reports[1], salesBySellers: reports[2]});
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

export const monthlySales = tryCatch(async (req, res) => {
  const { market_id } = req.params;

  const [monthlySales] = await pool.query(
    "SELECT MONTHNAME(t.date) AS month, SUM(s.price * s.quantify) AS total_sales FROM sold_products s INNER JOIN tickets t ON s.ticket_id = t.ticket_id WHERE s.market_id = ? GROUP BY MONTHNAME(t.date)",
    [market_id]
  );

  res.json(monthlySales);
});

export const productsSoldByMonth = tryCatch(async (req, res) => {
  const { market_id, month } = req.params;

  const [[{ month_name }]] = await pool.query(
    "SELECT MONTHNAME(?) AS month_name",
    [`${month}-${month}-${month}`]
  );

  const [productsSoldByMonth] = await pool.query(
    "SELECT p.product_id, p.name, p.description, p.category_name, p.price, SUM(p.quantify) AS quantify, SUM(p.price * p.quantify) AS amount FROM sold_products p INNER JOIN tickets t ON p.ticket_id = t.ticket_id WHERE p.market_id = ? AND MONTH(t.date) = ? GROUP BY p.product_id, p.name, p.description, p.category_name, p.price, MONTHNAME(t.date), MONTH(t.date)",
    [market_id, month]
  );

  res.json({
    productsSoldByMonth: { month: month_name, products: productsSoldByMonth },
  });
});

export const productsSoldByWeek = tryCatch(async (req, res) => {
  const { market_id, week } = req.params;

  const [productsSoldByWeek] = await pool.query(
    "SELECT s.product_id, s.name, s.description, s.category_name, s.price, SUM(quantify) AS quantify, SUM(s.price * s.quantify) AS amount FROM sold_products s INNER JOIN tickets t ON s.ticket_id = t.ticket_id WHERE s.market_id = ? AND WEEK(t.date) = ? GROUP BY s.product_id, s.name, s.description, s.category_name, s.price, WEEK(t.date)",
    [market_id, week]
  );

  res.json({ productsSoldByWeek: { week, products: productsSoldByWeek } });
});
