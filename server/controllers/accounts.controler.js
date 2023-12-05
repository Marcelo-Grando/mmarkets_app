import { pool } from "../db.js";

const randomId = function (length = 6) {
    return Math.random()
      .toString(36)
      .substring(2, length + 2);
  };

export const createMainAccount = async (req, res) => {
  const { name, adress, state, email, roles, password } = req.body;

  try {
    const market_id = randomId(12);

    const [create_market] = await pool.query(
      "INSERT INTO markets (market_id, name, adress, state, email) VALUES (?, ?, ?, ?, ?)",
      [market_id, name, adress, state, email]
    );

    console.log("create market", create_market);

    const [create_user] = await pool.query(
      "INSERT INTO users (user_id, email, roles, password, market_id) VALUES (?, ?, ?, ?, ?)",
      [market_id, email, roles, password, market_id]
    );

    
    console.log("create user", create_user);

    res.json({ message: "Created Account" });
  } catch (error) {
    res.json(error);
  }
};
