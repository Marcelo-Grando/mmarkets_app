import { Router } from "express";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.controller.js";

const router = Router();

router.get("/categories/:market_id", getCategories);

router.get("/categories", getCategory);

router.post("/categories/:market_id", createCategory);

router.patch("/categories", updateCategory);

router.delete("/categories", deleteCategory);

export default router;
