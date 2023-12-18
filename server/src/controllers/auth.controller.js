import { pool } from "../db.js";
import { tryCatch } from "../utils/tryCatch.js";
import { ClientError } from "../errors/Errors.js";

const comparePassword = async (user_id, password) => {
  const [[{ blobPassword }]] = await pool.query(
    "SELECT password AS blobPassword FROM users WHERE user_id = ?",
    [user_id]
  );

  const [[{ decryptBlobPassword }]] = await pool.query(
    "SELECT AES_DECRYPT(?, 'clave') AS decryptBlobPassword",
    [blobPassword]
  );

  const decryptPassword = decryptBlobPassword.toString();

  return decryptPassword === password;
};

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
