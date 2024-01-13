import { pool } from "../db.js";
import { tryCatch } from "../utils/tryCatch.js";
import { encryptPassword } from "../utils/encryptPassword.js";
import { ClientError } from "../errors/Errors.js";
import { generateId } from "../utils/generateId.js";

export const getSellersAccounts = tryCatch(async (req, res) => {
  const { market_id } = req.params;

  const [sellers] = await pool.query(
    "SELECT * FROM accounts_employees_view WHERE market_id = ? AND roles = ?",
    [market_id, "seller"]
  );

  if (!sellers.length) throw new ClientError("There are no seller accounts");

  res.json(sellers);
});

export const getAdminsAccounts = tryCatch(async (req, res) => {
  const { market_id } = req.params;

  const [admins] = await pool.query(
    "SELECT * FROM accounts_employees_view WHERE market_id = ? AND roles = ?",
    [market_id, "admin"]
  );

  if (!admins.length) throw new ClientError("There are no admin accounts");

  res.json(admins);
});

export const getEmployeesAccounts = tryCatch(async (req, res) => {
  const { market_id } = req.params;

  const [employees] = await pool.query(
    "SELECT * FROM accounts_employees_view WHERE market_id = ?",
    [market_id]
  );

  if (!employees.length)
    throw new ClientError("There are no employee accounts");

  res.json(employees);
});

export const createMainAccount = tryCatch(async (req, res) => {
  const { name, adress, state, email, password } = req.body;

  const market_id = generateId(12);
  const passwordEncrypted = await encryptPassword(password);

  const [response] = await pool.query(
    "CALL createMainAccount(?, ?, ?, ?, ?, ?)",
    [market_id, name, adress, state, email, passwordEncrypted]
  );

  res.json(response);
});

export const createEmployeeAccount = tryCatch(async (req, res) => {
  const { market_id } = req.params;
  const { email, position, password, name, lastname, dni } = req.body;

  const user_id = generateId(12);

  const passwordEncrypted = await encryptPassword(password);

  const [response] = await pool.query("CALL createEmployeeAccount(?, ?, ?, ?, ?, ?, ?, ?)", 
  [user_id, market_id, email, name, lastname, dni, position, passwordEncrypted])

  res.json(response);
});

export const deleteEmployeeAccount = tryCatch(async (req, res) => {
  const { market_id, employee_id } = req.params;

  const [deleteEmployee] = await pool.query(
    "DELETE FROM employees WHERE market_id = ? AND employee_id = ?",
    [market_id, employee_id]
  );

  const [deleteUser] = await pool.query(
    "DELETE FROM users WHERE market_id = ? AND user_id = ?",
    [market_id, employee_id]
  );

  res.sendStatus(204);
});
