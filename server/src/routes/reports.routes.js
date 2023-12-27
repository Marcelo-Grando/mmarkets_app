import { Router } from "express";

import {
    getTickets,
  salesByProducts,
  salesByCategories,
  salesBySellers,
  salesByDay,
  monthlySales,
  productsSoldByMonth,
  productsSoldByWeek,
} from "../controllers/reports.controller.js";

const router = Router();

router.get("/reports/:market_id/tickets", getTickets);

router.get("/reports/:market_id/products", salesByProducts);

router.get("/reports/:market_id/categories", salesByCategories);

router.get("/reports/:market_id/sellers", salesBySellers);

router.get("/reports/:market_id/date/:date", salesByDay);

router.get("/reports/:market_id/months", monthlySales);

router.get("/reports/:market_id/month/:month", productsSoldByMonth);

router.get("/reports/:market_id/week/:week", productsSoldByWeek);

export default router;
