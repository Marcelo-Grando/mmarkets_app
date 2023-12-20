import { Router } from "express";

import { getSoldProducts, salesByProducts, salesByCategories, salesBySellers } from "../controllers/reports.controller.js";

const router = Router()

router.get("/reports/:market_id", getSoldProducts)

router.get("/reports/:market_id/products", salesByProducts)

router.get("/reports/:market_id/categories", salesByCategories)

router.get("/reports/:market_id/sellers", salesBySellers)

export default router