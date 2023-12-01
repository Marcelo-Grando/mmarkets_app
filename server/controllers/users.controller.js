import { pool } from "../db.js";

const randomId = function(length = 6) {
  return Math.random().toString(36).substring(2, length+2);
};

export const createUser = async (req, res) => {
  const { email, roles, password, market_id } = req.body;

  const user_id = randomId(12)

  try {
    const response = await pool.query(
      "INSERT INTO users (user_id, email, roles, password, market_id) VALUES (?, ?, ?, ?, ?)",
      [user_id, email, roles, password, market_id]
    );

    res.status(201).json({message: "Created user"})
  } catch (error) {
    res.json(error);
  }
};

export const createMainUser = async (req, res) => {
    const SECRET = process.env.SECRET

    const {user_id} = req.params
    const { email, roles, password } = req.body;
  
    try {
      const response = await pool.query(
        "INSERT INTO users (user_id, email, roles, password, market_id) VALUES (?, ?, ?, ?, ?)",
        [user_id, email, roles, password, user_id]
      );
  
      res.status(201).json({message: "Created Main user"})
    } catch (error) {
      res.json(error);
    }
  };
