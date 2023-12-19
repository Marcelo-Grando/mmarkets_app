import { pool } from "../db.js";
import { ClientError } from "../errors/Errors.js";
import { tryCatch } from "../utils/tryCatch.js";

export const getEmployees = tryCatch(async (req, res) => {
  const { market_id } = req.params;

  const [employees] = await pool.query(
    "SELECT * FROM employees WHERE market_id = ?",
    [market_id]
  );

  if (!employees.length) throw new ClientError("Employees not found", 404);

  res.json(employees);
});

export const createEmployee = async (req, res) => {
  const { market_id } = req.params;
  const { employee_id, name, lastname, dni, position } = req.body;

  try {
    const response = await pool.query(
      "INSERT INTO employees (employee_id, name, lastname, dni, position, market_id) VALUES (?, ?, ?, ?, ?, ?)",
      [employee_id, name, lastname, dni, position, market_id]
    );

    res.status(201).json({ message: "Created Employee" });
  } catch (error) {
    res.json(error);
  }
};

export const deleteEmployee = async (req, res) => {
  const { market_id, employee_id } = req.params;

  try {
    const response = await pool.query(
      "DELETE FROM employees WHERE market_id = ? AND employee_id = ?",
      [market_id, employee_id]
    );

    res.sendStatus(204);
  } catch (error) {
    res.json(error);
  }
};
