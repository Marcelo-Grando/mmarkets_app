import { pool } from "../db.js";
import { tryCatch } from "../utils/tryCatch.js";
import { ClientError } from "../errors/Errors.js";
import { generateId } from "../utils/generateId.js";

export const getCategories = tryCatch(async (req, res) => {
  const { market_id } = req.params;

  const SECRET = process.env.SECRET;

  console.log("secret", SECRET)

  const [categories] = await pool.query(
    "SELECT * FROM categories WHERE market_id = ?",
    [market_id]
  );

  if (!categories.length) throw new ClientError("There are no categories");

  res.json(categories);
});

export const getCategory = tryCatch(async (req, res) => {
  const { market_id, category_id } = req.params;

  const [[category]] = await pool.query(
    "SELECT * FROM categories WHERE market_id = ? AND category_id = ?",
    [market_id, category_id]
  );

  if (!category) throw new ClientError("Category not found");

  res.json(category);
});

export const createCategory = tryCatch(async (req, res) => {
  const { market_id } = req.params;
  const { name } = req.body;

  const category_id = generateId(12);

  const [response] = await pool.query(
    "INSERT INTO categories (category_id, name, market_id, created) VALUES (?, ?, ?, NOW())",
    [category_id, name, market_id]
  );

  res.status(201).json({ message: "Category created" });
});

export const updateCategory = tryCatch(async (req, res) => {
  const { market_id, category_id } = req.params;
  const { name } = req.body;

  const [response] = await pool.query(
    "UPDATE categories SET name = IFNULL(?, name) WHERE market_id = ? AND category_id = ?",
    [name, market_id, category_id]
  );

  const [[category]] = await pool.query(
    "SELECT * FROM categories WHERE market_id = ? AND caegory_id = ?",
    [market_id, category_id]
  );

  res.json(category);
});

export const deleteCategory = tryCatch(async (req, res) => {
  const { market_id, category_id } = req.params;

  const [response] = await pool.query(
    "DELETE FROM categories WHERE market_id = ? AND category_id = ?",
    [market_id, category_id]
  );

  res.sendStatus(204);
});
