import { Router } from "express";

import { login, logout, test } from "../controllers/auth.controller.js";

import { validateUser } from "../middlewares/validations.js";

const router = Router()

router.get("/auth/test", test)

router.post("/auth", validateUser, login)

router.delete("/auth", logout)

export default router