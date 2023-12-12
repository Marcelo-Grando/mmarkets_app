import { Router } from "express";

import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/products.controller.js";

import { validateProduct } from "../middlewares/validations.js";

const router = Router()

router.get("/products/:market_id", getProducts)

router.post("/products/:market_id", validateProduct, createProduct)

router.get("/products/:market_id/:product_id", getProduct)

router.post("/products/:market_id", createProduct)

router.patch("/products/:market_id/:product_id", updateProduct)

router.delete("/products/:market_id/:product_id", deleteProduct)

export default router