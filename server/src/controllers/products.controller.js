import { pool } from "../db.js";
import { tryCatch } from "../utils/tryCatch.js";
import { ClientError } from "../errors/Errors.js";
import { generateId } from "../utils/generateId.js";

// export const getProducts = tryCatch(async (req, res) => {
//   const { market_id } = req.params;

//   const [products] = await pool.query(
//     "SELECT * FROM products WHERE market_id = ?",
//     [market_id]
//   );

//   if (!products.length) throw new ClientError("There are no products", 404);

//   res.json(products);
// });

export const getProducts = tryCatch(async (req, res) => {
  const { market_id } = req.params;
  
  const [products] = await pool.query(
    "SELECT p.product_id, p.name, p.description, p.category_id, c.name AS category_name, p.price, p.expiration, p.market_id  FROM products p INNER JOIN categories c ON p.category_id = c.category_id WHERE p.market_id = ?",
    [market_id]
  );

  if (!products.length) throw new ClientError("There are no products", 404);

  res.json(products);
});

export const getProduct = async (req, res) => {
  const { market_id, product_id } = req.params;

  const [[product]] = await pool.query(
    "SELECT * FROM products WHERE market_id = ? AND product_id = ?",
    [market_id, product_id]
  );

  if (!product) throw new ClientError("Product not found", 404);

  res.json(product);
};

export const createProduct = tryCatch(async (req, res) => {
  const { market_id } = req.params;
  const { name, description, price, expiration, category_id } = req.body;

  const product_id = generateId(12);

  const [response] = await pool.query(
    "INSERT INTO products (product_id, name, description, price, expiration, category_id, market_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [product_id, name, description, price, expiration, category_id, market_id]
  );

  res.status(201).json({ message: "Created product" });
});

export const updateProduct = tryCatch(async (req, res) => {
  const { market_id, product_id } = req.params;
  const { name, description, price, expiration, category_id } = req.body;

  const [result] = await pool.query(
    "UPDATE products SET name = IFNULL(?, name), description = IFNULL(?, description), price = IFNULL(?, price), expiration = IFNULL(?, expiration), category_id = IFNULL(?, category_id) WHERE product_id = ? AND market_id = ?",
    [name, description, price, expiration, category_id, product_id, market_id]
  );

  const [[modifyProduct]] = await pool.query(
    "SELECT * FROM products WHERE product_id = ? AND market_id = ?",
    [product_id, market_id]
  );

  res.json(modifyProduct);
});

export const deleteProduct = tryCatch(async (req, res) => {
  const { market_id, product_id } = req.params;

  const [response] = await pool.query(
    "DELETE FROM products WHERE market_id = ? AND product_id = ?",
    [market_id, product_id]
  );

  res.sendStatus(204);
});
