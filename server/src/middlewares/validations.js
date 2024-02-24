import { pool } from "../db.js";
import { tryCatch } from "../utils/tryCatch.js";
import { ClientError } from "../errors/Errors.js";
import { comparePassword } from "../utils/encryptPassword.js";
import { findUserByEmail } from "../helpers/searchEngines.js";

export const validateUser = tryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  const userFound = await findUserByEmail(email);

  if (!userFound)
    throw new ClientError("The email doesn't belong to an existing user");

  const { user_id, roles } = userFound;

  const passwordCompared = await comparePassword(user_id, password);

  if (!passwordCompared) throw new ClientError("Incorrect Password", 401);

  req.userQuerysData = {user_id, roles}

  next();
});

export const validateMainAccountData = tryCatch(async (req, res, next) => {
  const { name, adress, state, email, password } = req.body;

  if (!name || !adress || !state || !email || !password)
    throw new ClientError("Incomplete Fiels");

  const [[mainAccount]] = await pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (mainAccount)
    throw new ClientError(`An account already exist with the email: ${email}`);

  next();
});

export const validateEmployeAccountData = tryCatch(async (req, res, next) => {
  const { email, position, password, name, lastname, dni } = req.body;

  if (!email || !position || !password || !name || !lastname || !dni)
    throw new ClientError("Incomplete Fiels");

  const [[user]] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

  if (user)
    throw new ClientError(
      `There is already a account with the email: ${email}`
    );

  next();
});

export const validateCategoryData = tryCatch(async (req, res, next) => {
  const {market_id} = req.params
  const { name } = req.body;

  if (!name) throw new ClientError("Incomplete Fiels");

  const [[category]] = await pool.query("SELECT * FROM categories WHERE name = ? AND market_id = ?", [
    name, market_id
  ]);

  if (category) throw new ClientError(`The ${name} category already existe`);

  next();
});

export const validateProductData = tryCatch(async (req, res, next) => {
  const { market_id } = req.params;
  const { name, description, price, category_id } = req.body;

  console.log(" name, description, price, category_id",  name, description, price, category_id)

  if (!name || !description || !price || !category_id)
    throw new ClientError("Incomplete Fiels");

  const [[product]] = await pool.query(
    "SELECT * FROM products WHERE market_id = ? AND name = ? AND description = ?",
    [market_id, name, description]
  );

  if (product)
    throw new ClientError(
      `The product ${name + " " + description} already exists`
    );

  next();
});

export const validateSession = tryCatch(async (req, res, next) => {
  const session_id = req.session.id;

  const [[activeSession]] = await pool.query(
    "SELECT session_id, JSON_EXTRACT(data, '$[0].userData.user_id') AS user_id, JSON_EXTRACT(data, '$[0].cookie.expires') AS expires from sessions WHERE session_id = ?",
    [session_id]
  );

  if (!activeSession)
    throw new ClientError("The user doesn't have an active session", 401);

  if (!activeSession.user_id)
    throw new ClientError("The user doesn't have an active session", 401);

  if (activeSession.user_id !== req.session.userData.user_id)
    throw new ClientError("The user doesn't have an active session", 401);

  next();
});
