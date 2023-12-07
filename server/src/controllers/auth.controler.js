import { pool } from "../db.js";

const comparePassword = async (user_id, password) => {
    const [[{ blobPassword }]] = await pool.query(
      "SELECT password AS blobPassword FROM users WHERE user_id = ?",
      [user_id]
    );
  
    console.log(blobPassword);
  
    const [[{ decryptBlobPassword }]] = await pool.query(
      "SELECT AES_DECRYPT(?, 'clave') AS decryptBlobPassword",
      [blobPassword]
    );
  
    const decryptPassword = decryptBlobPassword.toString()
  
    return decryptPassword === password;
};

const findUserIdByEmail = async (email) => {
  const [[user]] = await pool.query(
    "SELECT user_id FROM users WHERE email = ?",
    [email]
  );

  const { user_id } = user;

  return user_id;
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user_id = await findUserIdByEmail(email);

    console.log(user_id, password);

    if (!user_id)
      return res.status(401).json({ message: "User dont not exist" });

    const passwordCompared = await comparePassword(user_id, password);

    if (!passwordCompared)
      return res.status(401).json({ message: "Incorrect Password" });

    req.session.user_id = user_id;

    res.json({ auth: true });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const logout = async (req, res) => {
  try {
    req.session.destroy();
    res.json({ message: "Session ended successfully" });
  } catch (error) {
    res.send(error);
  }
};
