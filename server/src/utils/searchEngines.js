import {pool} from "../db.js"

export const findUserByEmail = async (email) => {
    try {
      const [[user]] = await pool.query(
        "SELECT user_id, email, roles, password, market_id FROM users WHERE email = ?",
        [email]
      );
  
      if (!user) return;
  
      return user;
    } catch (error) {
      res.send(error);
    }
  };