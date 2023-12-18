import { tryCatch } from "../utils/tryCatch.js";
import { ClientError } from "../errors/Errors.js";
import { comparePassword } from "../utils/encryptPassword.js";

export const login = tryCatch(async (req, res) => {
  const { password } = req.body;
  const user = req.user;

  const passwordCompared = await comparePassword(user.user_id, password);

  if (!passwordCompared) throw new ClientError("Incorrect Password", 401);

  req.session.user = user;

  res.json({ auth: true });
});

export const logout = tryCatch(async (req, res) => {
  req.session.destroy();

  res.json({ message: "Session ended successfully" });
});
