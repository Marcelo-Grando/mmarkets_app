import { tryCatch } from "../utils/tryCatch.js";
import {pool} from "../db.js"

export const login = tryCatch(async (req, res) => {

  console.log(req.session.userData)

  req.session.userData = req.userQuerysData;

  res.json({auth: true});
});

export const logout = tryCatch(async (req, res) => {
  req.session.destroy()

  res.json({ message: "Session ended successfully" });
});


export const test = tryCatch(async(req, res) => {

  const [[userData]] = await pool.query("call getUserInfo(?)", [req.session.id])

  res.json(userData[0])
})