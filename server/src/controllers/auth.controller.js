import { pool } from "../db.js";

const comparePassword = async (user_id, password) => {
    const [[{ blobPassword }]] = await pool.query(
      "SELECT password AS blobPassword FROM users WHERE user_id = ?",
      [user_id]
    );
  
    const [[{ decryptBlobPassword }]] = await pool.query(
      "SELECT AES_DECRYPT(?, 'clave') AS decryptBlobPassword",
      [blobPassword]
    );
  
    const decryptPassword = decryptBlobPassword.toString()
  
    return decryptPassword === password;
};

const findUserByEmail = async (email) => {
  try {
    const [[user]] = await pool.query(
      "SELECT user_id, email, roles, market_id FROM users WHERE email = ?",
      [email]
    );
  
    if(!user) return
  
    return user;
  } catch (error) {
   res.send(error) 
  }
};

export const login = async (req, res) => {
  const { password } = req.body;
  const user = req.user

  try {
    const passwordCompared = await comparePassword(user.user_id, password);

    if (!passwordCompared)
      return res.status(401).json({ message: "Incorrect Password" });

    req.session.user = user;

    res.json({auth: true});
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
