import { Router } from "express";

import { getSoldProducts } from "../controllers/reports.controller.js";

const router = Router()

router.get("/reports/:market_id", getSoldProducts)

export default router