import { Router } from "express";

import { validateMainAccountData, validateEmployeAccountData, validateSession } from "../middlewares/validations.js";

import { createMainAccount, createEmployeeAccount, getEmployeesAccounts, getAdminsAccounts, getSellersAccounts, deleteEmployeeAccount, getUserId } from "../controllers/accounts.controller.js";

const router = Router()

router.get("/accounts/userId", getUserId)

router.post("/accounts", validateMainAccountData, createMainAccount)

router.get("/accounts/:market_id",  validateSession, getEmployeesAccounts)

router.get("/accounts/:market_id/sellers",  validateSession, getSellersAccounts)

router.get("/accounts/:market_id/admins",  validateSession, getAdminsAccounts)

router.post("/accounts/:market_id",  validateEmployeAccountData, createEmployeeAccount)

router.delete("/accounts/:market_id/:employee_id",  validateSession, deleteEmployeeAccount)

export default router