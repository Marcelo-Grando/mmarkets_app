import { Router } from "express";

import { createMainAccount, createEmployeeAccount } from "../controllers/accounts.controler.js";

const router = Router()

router.post("/accounts", createMainAccount)

router.post("/accounts/:market_id", createEmployeeAccount)

export default router