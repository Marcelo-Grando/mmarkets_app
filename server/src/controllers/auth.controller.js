import { tryCatch } from "../utils/tryCatch.js";

export const login = tryCatch(async (req, res) => {
  const {user_id} = req

  console.log(user_id)

  req.session.user_id = user_id;

  res.json({ auth: true });
});

export const logout = tryCatch(async (req, res) => {
  req.session.destroy();

  res.json({ message: "Session ended successfully" });
});
