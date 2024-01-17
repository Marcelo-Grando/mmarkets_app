import { pool } from "../db.js";
import { tryCatch } from "../utils/tryCatch.js";
import { ClientError } from "../errors/Errors.js";
import { comparePassword } from "../utils/encryptPassword.js";
import { findUserByEmail } from "../helpers/searchEngines.js";

export const validateUser = tryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  const userFound = await findUserByEmail(email);

  console.log(userFound)

  if (!userFound)
    throw new ClientError("The email doesn't belong to an existing user");

  const { user_id, market_id, roles } = userFound;

  const passwordCompared = await comparePassword(user_id, password);

  if (!passwordCompared) throw new ClientError("Incorrect Password", 401);

  req.userQuerysData = {user_id, market_id, roles}

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
  const { email, roles, password, name, lastname, dni } = req.body;

  if (!email || !roles || !password || !name || !lastname || !dni)
    throw new ClientError("Incomplete Fiels");

  const [[user]] = pool.query("SELECT * FROM users WHERE email = ?", [email]);

  if (user)
    throw new ClientError(
      `There is already a account with the email: ${email}`
    );

  next();
});

export const validateCategoryData = tryCatch(async (req, res, next) => {
  const { name } = req.body;

  if (!name) throw new ClientError("Incomplete Fiels");

  const [[category]] = pool.query("SELECT * FROM categories WHERE name = ?", [
    name,
  ]);

  if (category) throw new ClientError(`The ${name} category already existe`);

  next();
});

export const validateProductData = tryCatch(async (req, res, next) => {
  const { market_id } = req.params;
  const { name, description, price, category_id } = req.body;

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

  console.log("session_id", session_id)

  console.log('req.session.id', req.session.id)

  const [[activeSession]] = await pool.query(
    "SELECT * from sessions WHERE session_id = ?",
    [session_id]
  );

  console.log("activeSession",activeSession)

  if (!activeSession)
    throw new ClientError("The user doesn't have an active session", 401);

  const { data } = activeSession;

  console.log("data", data)

  if (!data)
    throw new ClientError("The user doesn't have an active session", 401);

  const {userData: {user_id}} = JSON.parse(data);

  console.log("user_id", user_id)

  console.log("req.session.userData.user_id", req.session.userData.user_id)

  if (user_id !== req.session.userData.user_id)
    throw new ClientError("The user doesn't have an active session", 401);

  next();
});
