import { Router } from "express";

import { createMarket, getMarkets } from "../controllers/markets.controller.js";

const router = Router()

router.post("/markets", createMarket)

router.get("/markets", getMarkets)

export default router