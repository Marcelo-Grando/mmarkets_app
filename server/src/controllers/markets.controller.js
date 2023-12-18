import { pool } from "../db.js";
import { tryCatch } from "../utils/tryCatch.js";
import { generateId } from "../utils/generateId.js";

export const getMarkets = tryCatch(async (req, res) => {
  const [markets] = await pool.query("SELECT * FROM markets");

  res.json(markets);
});

export const createMarket = tryCatch(async (req, res) => {
  const { name, adress, state, email } = req.body;
  const market_id = generateId(12);

  const response = await pool.query(
    "INSERT INTO markets (market_id, name, adress, state, email) VALUES (?, ?, ?, ?, ?)",
    [market_id, name, adress, state, email]
  );

  res.status(201).json({ message: "Created Market" });
});

export const deleteMarket = tryCatch(async (req, res) => {
  const { market_id } = req.params;

  const response = await pool.query("DELETE FROM markets WHERE market_id =?", [
    market_id,
  ]);

  res.sendStatus(204);
});
