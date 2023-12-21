import { Router } from "express";

import { createPaymentType, getPaymentTypes } from "../controllers/payment_types.controller.js";

const router = Router()

router.get("/payment-types/:market_id", getPaymentTypes)

router.post("/payment-types/:market_id", createPaymentType)

export default router