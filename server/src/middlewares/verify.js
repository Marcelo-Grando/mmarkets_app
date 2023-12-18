import { pool } from "../db.js";
import { tryCatch } from "../utils/tryCatch.js";
import { ClientError } from "../errors/Errors.js";

export const verifySession = tryCatch(async (req, res, next) => {
  const session_id = req.session.id;

  const [[activeSession]] = await pool.query(
    "SELECT * from sessions WHERE session_id = ?",
    [session_id]
  );

  if (!activeSession)
    throw new ClientError("The user doesn't have an active session")

  const [[{ data }]] = await pool.query(
    "SELECT data FROM sessions WHERE session_id = ?",
    [session_id]
  );

  const { user } = JSON.parse(data);

  req.user = user;
})

const findUserByEmail = async (email) => {
  try {
    const [[user]] = await pool.query(
      "SELECT user_id, email, roles, market_id FROM users WHERE email = ?",
      [email]
    );

    if (!user) return;

    return user;
  } catch (error) {
    res.send(error);
  }
};

export const verfyEmail = tryCatch(async ( req, res, next) => {
  const { email } = req.body;

  const userFound = await findUserByEmail(email);

  if (!userFound) throw new ClientError("The email doesn't belong to an existing user")

  req.user = userFound;

  next();
});
