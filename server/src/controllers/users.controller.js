import { pool } from "../db.js";

import { ClientError } from "../errors/Errors.js";
import { tryCatch } from "../utils/tryCatch.js";

const randomId = function (length = 6) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

export const getUsers = tryCatch(
  async (req, res) => {
    const { market_id } = req.params;
  
      const [users] = await pool.query(
        "SELECT user_id, email, roles FROM users WHERE market_id = ?",
        [market_id]
      );
  
      if (!users.length) throw new ClientError("Users not found", 404);
  
      res.json(users);
  }
);

export const createUser = async (req, res, next) => {
  const { email, roles, password, market_id } = req.body;

  const user_id = randomId(12);

  try {
    const response = await pool.query(
      "INSERT INTO users (user_id, email, roles, password, market_id) VALUES (?, ?, ?, ?, ?)",
      [user_id, email, roles, password, market_id]
    );

    res.status(201).json({ message: "Created user" });
    next();
  } catch (error) {
    res.json(error);
  }
};

export const createMainUser = async (req, res) => {
  const SECRET = process.env.SECRET;

  const { email, roles, password } = req.body;

  const user_id = randomId(12);

  try {
    const response = await pool.query(
      "INSERT INTO users (user_id, email, roles, password, market_id) VALUES (?, ?, ?, ?, ?)",
      [user_id, email, roles, password, user_id]
    );

    res.status(201).json({ message: "Created Main user" });
  } catch (error) {
    res.json(error);
  }
};

export const updateUser = async (req, res) => {
  const { market_id, user_id } = req.params;

  res.json({ message: "UPDATE USER" });
};

export const deleteUser = async (req, res) => {
  const { market_id, user_id } = req.params;

  try {
    const response = await pool.query(
      "DELETE FROM users WHERE market_id = ? AND user_id = ?",
      [market_id, user_id]
    );

    res.status(204);
  } catch (error) {
    res.json(error);
  }
};
