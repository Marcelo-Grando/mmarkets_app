import { Router } from "express";

import { login, logout } from "../controllers/auth.controller.js";

import { validateUser } from "../middlewares/validations.js";

const router = Router()

router.post("/auth", validateUser, login)

router.delete("/auth", logout)

export default router