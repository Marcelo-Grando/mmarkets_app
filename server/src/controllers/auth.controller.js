import { tryCatch } from "../utils/tryCatch.js";
import {pool} from "../db.js"

export const login = tryCatch(async (req, res) => {

  req.session.userData = req.userQuerysData;

  res.json(req.userQuerysData);
});

export const logout = tryCatch(async (req, res) => {
  req.session.destroy();

  res.json({ message: "Session ended successfully" });
});


export const test = tryCatch(async(req, res) => {
  console.log("test ",req.session.id)

  const [[{data}]] = await pool.query("SELECT * FROM sessions WHERE session_id = ?", req.session.id)

  const {user_id, market_id} = JSON.parse(data).userData

  console.log(JSON.parse(data).userData)

  console.log("userData", user_id, market_id)

  res.json(user_id)
})