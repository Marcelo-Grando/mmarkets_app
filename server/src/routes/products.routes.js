import { Router } from "express";

import { getProducts, createProduct } from "../controllers/products.controller";

const router = Router()

router.get("/products/:market_id", getProducts)

router.post("/products/:market_id")

export default router