import { Router } from "express";

import { makeSale } from "../controllers/sales.controller.js";

const router = Router()

router.post("/sales/:market_id/:employee_id", makeSale)

export default router