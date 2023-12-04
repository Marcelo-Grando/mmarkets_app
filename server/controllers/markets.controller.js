import { pool } from "../db.js";

const randomId = function (length = 6) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

export const getMarkets = async (req, res) => {
  try {
    const [markets] = await pool.query("SELECT * FROM markets");

    res.json(markets);
  } catch (error) {
    res.json(error);
  }
};

export const createMarket = async (req, res) => {
  const { name, adress, state, email } = req.body;

  const market_id = randomId(12);

  try {
    const response = await pool.query(
      "INSERT INTO markets (market_id, name, adress, state, email) VALUES (?, ?, ?, ?, ?)",
      [market_id, name, adress, state, email]
    );

    res.status(201).json({ message: "Created Market" });
  } catch (error) {
    res.json(error);
  }
};

export const deleteMarket = async (req, res) => {
  const { market_id } = req.params

  try {
    const response = await pool.query("DELETE FROM markets WHERE market_id = ?", [
      market_id,
    ]);

    res.status(204)
  } catch (error) {
    res.json(error)
  }
};
