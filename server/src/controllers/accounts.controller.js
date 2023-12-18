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

  if (!admins.length)
    throw new ClientError("There are no admin accounts")

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
  const { name, adress, state, email, roles, password } = req.body;

  const market_id = generateId(12)

  const [createMarket] = await pool.query(
    "INSERT INTO markets (market_id, name, adress, state, email) VALUES (?, ?, ?, ?, ?)",
    [market_id, name, adress, state, email]
  );

  const passwordEncrypted = await encryptPassword(password);

  const [createUser] = await pool.query(
    "INSERT INTO users (user_id, email, roles, password, market_id) VALUES (?, ?, ?, ?, ?)",
    [market_id, email, roles, passwordEncrypted, market_id]
  );

  res.json({ message: "Created Account" });
});

export const createEmployeeAccount = tryCatch(async (req, res) => {
  const { market_id } = req.params;
  const { email, roles, password, name, lastname, dni } = req.body;

  const user_id = generateId(12);

  const passwordEncrypted = await encryptPassword(password);

  const [createUser] = await pool.query(
    "INSERT INTO users (user_id, email, roles, password, market_id) VALUES (?, ?, ?, ?, ?)",
    [user_id, email, roles, passwordEncrypted, market_id]
  );

  const [createEmploye] = await pool.query(
    "INSERT INTO employees (employee_id, name, lastname, dni, position, market_id) VALUES (?, ?, ?, ?, ?, ?)",
    [user_id, name, lastname, dni, roles, market_id]
  );

  res.json({ message: "Successfully created account" });
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
