import { pool } from "../db.js";
import { tryCatch } from "../utils/tryCatch.js";

const randomId = function (length = 6) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

export const getMarkets = tryCatch(async (req, res) => {
  const [markets] = await pool.query("SELECT * FROM markets");

  res.json(markets);
})

export const createMarket = tryCatch(async (req, res) => {
  const { name, adress, state, email } = req.body;
const market_id = randomId(12);

    const response = await pool.query(
      "INSERT INTO markets (market_id, name, adress, state, email) VALUES (?, ?, ?, ?, ?)",
      [market_id, name, adress, state, email]
    );

    res.status(201).json({ message: "Created Market" });
})

export const deleteMarket = tryCatch(async (req, res) => {
  const { market_id } = req.params

    const response = await pool.query("DELETE FROM markets WHERE market_id =?", [market_id]);

    res.sendStatus(204)
})
