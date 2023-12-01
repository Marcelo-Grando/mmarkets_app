import { Router } from "express";

import { createEmployee, getEmployees } from "../controllers/employees.controller.js";

const router = Router()

router.post("/employees/:market_id", createEmployee)

router.get("/employees/:market_id", getEmployees)

export default router