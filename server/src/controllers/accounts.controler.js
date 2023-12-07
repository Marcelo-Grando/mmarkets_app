import { pool } from "../db.js";

const randomId = function (length = 6) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

const encryptPassword = async (password) => {
  const [[{ encryptedPassword }]] = await pool.query(
    "SELECT AES_ENCRYPT(?, 'clave') AS encryptedPassword",
    [password]
  );

  return encryptedPassword;
};

export const getSellersAccounts = async (req, res) => {
  const { market_id } = req.params;

  try {
    const [sellers] = await pool.query(
      "SELECT * FROM accounts_employees_view WHERE market_id = ? AND roles = ?",
      [market_id, "seller"]
    );

    if (!sellers.length)
      return res.status(404).json({ message: "Employees not found" });

    res.json(sellers);
  } catch (error) {
    res.send(error);
  }
};

export const getAdminsAccounts = async (req, res) => {
  const { market_id } = req.params;

  try {
    const [admins] = await pool.query(
      "SELECT * FROM accounts_employees_view WHERE market_id = ? AND roles = ?",
      [market_id, "admin"]
    );

    if (!admins.length)
      return res.status(404).json({ message: "Employees not found" });

    res.json(admins);
  } catch (error) {
    res.send(error);
  }
};

export const getEmployeesAccounts = async (req, res) => {
  const { market_id } = req.params;

  try {
    const [employees] = await pool.query(
      "SELECT * FROM accounts_employees_view WHERE market_id = ?",
      [market_id]
    );

    if (!employees.length)
      return res.status(404).json({ message: "Employees not found" });

    res.json(employees);
  } catch (error) {
    res.send(error);
  }
};

export const createMainAccount = async (req, res) => {
  const { name, adress, state, email, roles, password } = req.body;

  try {
    const market_id = randomId(12);

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
  } catch (error) {
    res.json(error);
  }
};

export const createEmployeeAccount = async (req, res) => {
  const { market_id } = req.params;
  const { email, roles, password, name, lastname, dni } = req.body;
  const user_id = randomId(12);

  try {
    const [createUser] = await pool.query(
      "INSERT INTO users (user_id, email, roles, password, market_id) VALUES (?, ?, ?, ?, ?)",
      [user_id, email, roles, password, market_id]
    );

    const [createEmploye] = await pool.query(
      "INSERT INTO employees (employee_id, name, lastname, dni, email, position, market_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [user_id, name, lastname, dni, email, roles, market_id]
    );

    res.json({ message: "Account created" });
  } catch (error) {
    res.send(error);
  }
};

export const deleteEmployeeAccount = async (req, res) => {
  const { market_id, employee_id } = req.params;

  try {
    const [deleteEmployee] = await pool.query(
      "DELETE FROM employees WHERE market_id = ? AND employee_id = ?",
      [market_id, employee_id]
    );

    const [deleteUser] = await pool.query(
      "DELETE FROM users WHERE market_id = ? AND user_id = ?",
      [market_id, employee_id]
    );

    res.sendStatus(204);
  } catch (error) {
    res.send(error);
  }
};
