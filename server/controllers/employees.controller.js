import { pool } from "../db.js";

export const createEmployee = async (req, res) => {
  const { market_id } = req.params;
  const { employee_id, name, lastname, dni, email, position } = req.body;


  console.log(market_id)

  try {
    const response = await pool.query(
      "INSERT INTO employees (employee_id, name, lastname, dni, email, position, market_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [employee_id, name, lastname, dni, email, position, market_id]
    );

    res.status(201).json({ message: "Created Employee" });
  } catch (error) {
    res.json(error);
  }
};

export const getEmployees = async (req, res) => {
  const { market_id } = req.params;

  try {
    const [employees] = await pool.query(
      "SELECT * FROM employees WHERE market_id = ?",
      [market_id]
    );

    if (!employees.length) {
      return res.status(404).json({message: "Employees not found"});
    }

    res.json(employees);
  } catch (error) {
    res.json(error);
  }
};
