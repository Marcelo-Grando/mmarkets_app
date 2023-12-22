import {pool} from "../db.js"
import { tryCatch } from "../utils/tryCatch.js";
import { ClientError } from "../errors/Errors.js";

export const validateMainAccountData = tryCatch(async (req, res, next) => {
  const { name, adress, state, email, roles, password } = req.body;

  if (!name || !adress || !state || !email || !roles || !password)
    throw new ClientError("Incomplete Fiels");

  const [[mainAccount]] = await pool.query("SELECT * FROM users WHERE email = ?", [email])

  if(mainAccount) throw new ClientError(`An account already exist with the email: ${email}`)

  next();
});

export const validateEmployeAccountData = tryCatch(async (req, res, next) => {
  const { email, roles, password, name, lastname, dni } = req.body;

  if (!email || !roles || !password || !name || !lastname || !dni) throw new ClientError("Incomplete Fiels");

  const [[user]] = pool.query("SELECT * FROM users WHERE email = ?", [email])

  if(user) throw new ClientError(`There is already a account with the email: ${email}`)

  next();
});

export const validateCategoryData = tryCatch(async (req, res, next) => {
  const { name } = req.body;

  if (!name) throw new ClientError("Incomplete Fiels");

  const [[category]] = pool.query("SELECT * FROM categories WHERE name = ?", [name])

  if(category) throw new ClientError(`The ${name} category already existe`)

  next();
});

export const validateProductData = tryCatch(async (req, res, next) => {
  const {market_id} = req.params
  const { name, description, price, category_id } = req.body;

  if (!name || !description || !price || !category_id)
    throw new ClientError("Incomplete Fiels");

  const [[product]] = await pool.query("SELECT * FROM products WHERE market_id = ? AND name = ? AND description = ?", [market_id, name, description])

  if(product) throw new ClientError(`The product ${name + ' ' + description} already exists`)

  next();
});
