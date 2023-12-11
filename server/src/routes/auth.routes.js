import { Router } from "express";

import { login, logout } from "../controllers/auth.controller.js";

import { verfyEmail } from "../middlewares/verify.js";

const router = Router()

router.post("/auth", verfyEmail, login)

router.delete("/auth", logout)

export default router