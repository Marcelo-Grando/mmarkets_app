import { Router } from "express";

import { validateMainAccountData, validateEmployeAccountData } from "../middlewares/validations.js";
import { verifySession } from "../middlewares/verify.js";

import { createMainAccount, createEmployeeAccount, getEmployeesAccounts, getAdminsAccounts, getSellersAccounts, deleteEmployeeAccount } from "../controllers/accounts.controller.js";

const router = Router()

router.post("/accounts", validateMainAccountData, createMainAccount)

router.get("/accounts/:market_id", verifySession, getEmployeesAccounts)

router.get("/accounts/:market_id/sellers", verifySession, getSellersAccounts)

router.get("/accounts/:market_id/admins", verifySession, getAdminsAccounts)

router.post("/accounts/:market_id", verifySession, validateEmployeAccountData, createEmployeeAccount)

router.delete("/accounts/:market_id/:employee_id", verifySession, deleteEmployeeAccount)

export default router