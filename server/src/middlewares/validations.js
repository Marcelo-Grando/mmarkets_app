import {pool} from "../db.js"
import { tryCatch } from "../utils/tryCatch.js";
import { ClientError } from "../errors/Errors.js";

export const validateMainAccountData = tryCatch(async (req, res, next) => {
  const { name, adress, state, email, roles, password } = req.body;

  if (!name || !adress || !state || !email || !roles || !password)
    throw new ClientError("Incomplete Fiels");

  next();
});

export const validateEmployeAccountData = tryCatch(async (req, res, next) => {
  const { email, roles, password, name, lastname, dni } = req.body;

  if (!email || !roles || !password || !name || !lastname || !dni) throw new ClientError("Incomplete Fiels");

  next();
});

export const validateCategoryData = tryCatch(async (req, res, next) => {
  const { name } = req.body;

  if (!name) throw new ClientError("Incomplete Fiels");

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
