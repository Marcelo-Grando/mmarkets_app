import { Router } from "express";

import { getMarkets, createMarket, deleteMarket } from "../controllers/markets.controller.js";

const router = Router()

router.get("/markets", getMarkets)

router.post("/markets", createMarket)

router.delete("/markets/:market_id", deleteMarket)

export default router