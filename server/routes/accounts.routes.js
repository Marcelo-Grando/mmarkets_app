import { Router } from "express";

import { createMainAccount } from "../controllers/accounts.controler.js";

const router = Router()

router.post("/accounts", createMainAccount)

export default router