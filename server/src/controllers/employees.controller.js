import { pool } from "../db.js";
import { AppError, ClientError } from "../errors/Errors.js";
import { tryCatch } from "../utils/tryCatch.js";

export const getEmployees = async (req, res) => {
  const { market_id } = req.params;

    const [[market]] = await pool.query(
      "SELECT * FROM markets WHERE market_id = ?",
      [market_id]
    );

    if (!market) 
      throw new ClientError("Market not Found")

    const [employees] = await pool.query(
      "SELECT * FROM employees WHERE market_id = ?",
      [market_id]
    );

    if (!employees.length) {
      return res.status(404).json({ message: "Employees not found" });
    }

    res.json(employees);
}



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
