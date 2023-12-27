import { Router } from "express";

import { salesByProducts, salesByCategories, salesBySellers, salesByDay, reportsByDate, productsSoldByMonth } from "../controllers/reports.controller.js";

const router = Router()

router.get("/reports/:market_id/products", salesByProducts)

router.get("/reports/:market_id/categories", salesByCategories)

router.get("/reports/:market_id/sellers", salesBySellers)

router.get("/reports/:market_id/date/:date", salesByDay)

router.get("/reports/:market_id/date", reportsByDate)

router.get("/reports/:market_id/month/:month", productsSoldByMonth)

export default router