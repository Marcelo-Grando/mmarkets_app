import { tryCatch } from "../utils/tryCatch.js";

export const login = tryCatch(async (req, res) => {

  req.session.userData = req.userQuerysData;

  res.json(req.userQuerysData);
});

export const logout = tryCatch(async (req, res) => {
  req.session.destroy();

  res.json({ message: "Session ended successfully" });
});
