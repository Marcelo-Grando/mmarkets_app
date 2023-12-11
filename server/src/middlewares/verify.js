import { pool } from "../db.js";

export const verifySession = async (req, res, next) => {
  try {
    const session_id = req.session.id;

    const [[activeSession]] = await pool.query(
      "SELECT * from sessions WHERE session_id = ?",
      [session_id]
    );

    if (!activeSession)
      return res.status(401).json({ message: "There is not active session" });

    const [[{ data }]] = await pool.query(
      "SELECT data FROM sessions WHERE session_id = ?",
      [session_id]
    );

    const { user } = JSON.parse(data);

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    res.send(error);
  }
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

export const verfyEmail = async (req, res, next) => {
    const {email} = req.body

    try {
        const userFound = await findUserByEmail(email)

        if(!userFound) return res.status(404).json({message: "User not found"})

        req.user = userFound

        next()
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}
