import { Router } from "express";

import { validateMainAccountData, validateEmployeAccountData } from "../middlewares/validations.js";

import { createMainAccount, createEmployeeAccount, getEmployeesAccounts, getAdminsAccounts, getSellersAccounts, deleteEmployeeAccount } from "../controllers/accounts.controller.js";

const router = Router()

router.get("/accounts/:market_id", getEmployeesAccounts)

router.get("/accounts/:market_id/sellers", getSellersAccounts)

router.get("/accounts/:market_id/admins", getAdminsAccounts)

router.post("/accounts", validateMainAccountData, createMainAccount)

router.post("/accounts/:market_id", validateEmployeAccountData, createEmployeeAccount)

router.delete("/accounts/:market_id/:employee_id", deleteEmployeeAccount)

export default router