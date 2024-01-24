import { pool } from "../db.js";

export const encryptPassword = async (password) => {
  const [[{ encryptedPassword }]] = await pool.query(
    "SELECT AES_ENCRYPT(?, 'clave') AS encryptedPassword",
    [password]
  );

  return encryptedPassword;
};

export const comparePassword = async (user_id, password) => {
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
