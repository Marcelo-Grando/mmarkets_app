import { pool } from "../db.js";

const randomId = function (length = 6) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

export const makeSale = async (req, res) => {
  const { market_id, employee_id } = req.params;
  const { amount, products, employee_email, employee_name, market_name } = req.body;

  try {
    const sale_id = randomId(10);

    const [[{date, time}]] = await pool.query("SELECT DATE(NOW()) AS date, TIME(NOW()) AS time")

  const [tables] = await pool.query("show tables")

  console.log(tables)

    const [insert_sale] = await pool.query(
      "INSERT INTO sales (sale_id, amount, date, time, market_id, employee_id) VALUES (?, ?, ?, ?, ?, ?)",
      [sale_id, amount, date, time, market_id, employee_id]
    );

    const [insert_items] = products.map(
      async (product) =>
        await pool.query(
          "INSERT INTO items_for_sales ( quantify, sale_id, product_id, market_id) VALUES (?, ?, ?, ?)",
          [ product.quantify, sale_id, product.product_id, market_id]
        )
    );

    const sold_products = JSON.stringify(products);

    const [insert_ticket] = await pool.query(
      "INSERT INTO tickets (ticket_id, products, amount, date, time, sale_id, employee_id, employee_email, market_id, market_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        sale_id,
        sold_products,
        amount,
        date,
        time,
        sale_id,
        employee_id,
        employee_email,
        market_id,
        market_name,
      ]
    );

    const sold = 'sold'

    const sold_product = `${sold}_products`

    const [insert_sold_products] = products.map(
      async (product) =>
        await pool.query("INSERT INTO "+sold_product+" (product_id, name, description, category_name, price, quantify, ticket_id, employee_id, market_id, employee_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            product.product_id,
            product.name,
            product.description,
            product.category_name,
            product.price,
            product.quantify,
            sale_id,
            employee_id,
            market_id,
            employee_name
          ]
        )
    );

    res.json({ market_name, sale_id, date, time, products, amount });
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};
