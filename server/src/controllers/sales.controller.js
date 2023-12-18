import { pool } from "../db.js";
import { tryCatch } from "../utils/tryCatch.js";

const randomId = function (length = 6) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

const findProductsAndAmountForSale = async (products) => {
  let found_products = [];
  let amount = 0;

  for (let i = 0; i < products.length; i++) {
    const [[product]] = await pool.query(
      "SELECT p.product_id, p.name, p.description, p.price, c.name AS category_name FROM products p INNER JOIN categories c ON p.category_id = c.category_id WHERE p.product_id = ?",
      [products[i].product_id]
    );
    amount = amount + Number(product.price) * products[i].quantify;
    found_products.push({ ...product, quantify: products[i].quantify });
  }

  return { found_products, amount };
};

const getEmployeeData = async (employee_id, market_id) => {
  const [[employee_data]] = await pool.query(
    "SELECT e.employee_id, e.market_id, CONCAT(e.name, ' ', e.lastname) AS employee_name, u.email AS employee_email, m.name AS market_name FROM employees e INNER JOIN markets m ON e.market_id = m.market_id INNER JOIN users u ON e.employee_id = u.user_id WHERE e.employee_id = ? AND e.market_id = ?",
    [employee_id, market_id]
  );

  return employee_data;
};

const createSale = async (employee_id, market_id, products, amount) => {
  const sale_id = randomId(10);

  const [[{ date, time }]] = await pool.query(
    "SELECT DATE(NOW()) AS date, TIME(NOW()) AS time"
  );

  const [insert_sale] = await pool.query(
    "INSERT INTO sales (sale_id, amount, date, time, market_id, employee_id) VALUES (?, ?, ?, ?, ?, ?)",
    [sale_id, amount, date, time, market_id, employee_id]
  );

  const [insert_items] = products.map(
    async (product) =>
      await pool.query(
        "INSERT INTO items_for_sales ( quantify, sale_id, product_id, market_id) VALUES (?, ?, ?, ?)",
        [product.quantify, sale_id, product.product_id, market_id]
      )
  );

  return { sale_id, date, time };
};

const createTicket = async (sale, products, amount, employeeData) => {
  const sold_products = JSON.stringify(products);

  const [insert_ticket] = await pool.query(
    "INSERT INTO tickets (ticket_id, products, amount, date, time, sale_id, employee_id, employee_email, market_id, market_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      sale.sale_id,
      sold_products,
      amount,
      sale.date,
      sale.time,
      sale.sale_id,
      employeeData.employee_id,
      employeeData.employee_email,
      employeeData.market_id,
      employeeData.market_name,
    ]
  );

  const [insert_sold_products] = products.map(
    async (product) =>
      await pool.query(
        "INSERT INTO sold_products (product_id, name, description, category_name, price, quantify, ticket_id, employee_id, market_id, employee_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          product.product_id,
          product.name,
          product.description,
          product.category_name,
          product.price,
          product.quantify,
          sale.sale_id,
          employeeData.employee_id,
          employeeData.market_id,
          employeeData.employee_name,
        ]
      )
  );

  return {ticket_id: sale.sale_id}
};

export const makeSale = tryCatch(async (req, res) => {
  const { market_id, employee_id } = req.params;
  const { products } = req.body;

    const employeeData = await getEmployeeData(employee_id, market_id);

    const { found_products, amount } = await findProductsAndAmountForSale(products);

    const sale = await createSale(
      employee_id,
      market_id,
      found_products,
      amount
    );

    const ticket = await createTicket(
      sale,
      found_products,
      amount,
      employeeData
    );

    res.json({
      market_name: employeeData.market_name,
      sale_id: sale.sale_id,
      date: sale.date,
      time: sale.time,
      products: found_products,
      amount,
    });
})
