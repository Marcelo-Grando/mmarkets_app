import { Router } from "express";
import { tryCatch } from "../utils/tryCatch.js";

import { getEmployees, createEmployee, deleteEmployee } from "../controllers/employees.controller.js";

const router = Router()

router.get("/employees/:market_id", tryCatch(getEmployees))

router.post("/employees/:market_id", createEmployee)

router.delete("/employees/:market_id/:employee_id", deleteEmployee)

export default router