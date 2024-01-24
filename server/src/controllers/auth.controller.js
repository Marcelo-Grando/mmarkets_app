import { tryCatch } from "../utils/tryCatch.js";
import {pool} from "../db.js"

export const login = tryCatch(async (req, res) => {

  req.session.userData = req.userQuerysData;

  res.json({auth: true});
});

export const logout = tryCatch(async (req, res) => {
  req.session.destroy();

  res.json({ message: "Session ended successfully" });
});


export const test = tryCatch(async(req, res) => {
  const [[{data}]] = await pool.query("SELECT * FROM sessions WHERE session_id = ?", req.session.id)

  const {user_id} = JSON.parse(data).userData

  const [[userData]] = await pool.query("SELECT roles, market_id FROM users WHERE user_id = ?", [user_id])

  res.json({...userData, user_id})
})