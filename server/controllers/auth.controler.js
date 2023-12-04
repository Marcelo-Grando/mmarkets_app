import { pool } from "../db.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [[{ user_id }]] = await pool.query(
      "SELECT user_id FROM users WHERE email = ?",
      [email]
    );

    if (!user_id) {
      return res.status(401).json({ message: "User dont not exist" });
    }

    const [[{ user_password }]] = await pool.query(
      "SELECT password AS user_password FROM users WHERE user_id = ?",
      [user_id]
    );

    if (user_password.toString() != password) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    req.session.user_id = user_id;

    const [[session]] = await pool.query("SELECT * FROM sessions");

    const sessionData = JSON.parse(session.data);

    res.json({ session, sessionData });
  } catch (error) {
    res.json(error);
  }
};

export const logout = async (req, res) => {
  const { session_id } = req.params;

  try {
    const [[session]] = await pool.query(
      "DELETE FROM sessions WHERE session_id = ?",
      [session_id]
    );

    res.status(204);
  } catch (error) {
    res.json(error);
  }
};
