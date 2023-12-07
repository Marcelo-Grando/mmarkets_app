import { Router } from "express";

import { createMainAccount, createEmployeeAccount, getEmployeesAccounts } from "../controllers/accounts.controler.js";

const router = Router()

router.get("/accounts/:market_id", getEmployeesAccounts)

router.post("/accounts", createMainAccount)

router.post("/accounts/:market_id", createEmployeeAccount)

export default router