import { pool } from "../db.js";
import { tryCatch } from "../utils/tryCatch.js";
import { generateId } from "../utils/generateId.js";
import { ClientError } from "../errors/Errors.js";

export const makeSale = tryCatch(async (req, res) => {
  const { market_id, employee_id } = req.params;
  const { products, payment_type } = req.body;
  const sale_id = generateId(10);

  if (!products.length) throw new ClientError("Add products to make a sale");

  const products_json = JSON.stringify(products)

  const [[[{amount}]]] = await pool.query("CALL calculateTotalSale(?, ?)", [products_json, market_id])

  const [[[sale]]] = await pool.query("CALL make_sale(?, ?, ?, ?, ?)", [market_id, employee_id, products_json, amount, sale_id])

  res.json({...sale, _products:products})
});
