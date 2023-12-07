import { Router } from "express";

import { createMainAccount, createEmployeeAccount, getEmployeesAccounts, getAdminsAccounts, getSellersAccounts, deleteEmployeeAccount } from "../controllers/accounts.controler.js";

const router = Router()

router.get("/accounts/:market_id", getEmployeesAccounts)

router.get("/accounts/:market_id/sellers", getSellersAccounts)

router.get("/accounts/:market_id/admins", getAdminsAccounts)

router.post("/accounts", createMainAccount)

router.post("/accounts/:market_id", createEmployeeAccount)

router.delete("/accounts/:market_id/:employee_id", deleteEmployeeAccount)

export default router