import { Router } from "express";

import { login, logout, test } from "../controllers/auth.controller.js";

import { validateSession, validateUser } from "../middlewares/validations.js";

const router = Router()

router.get("/auth/test", validateSession, test)

router.post("/auth/login", validateUser, login)

router.delete("/auth/logout", logout)

export default router