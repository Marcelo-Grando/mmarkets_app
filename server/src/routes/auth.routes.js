import { Router } from "express";

import { login, logout } from "../controllers/auth.controler.js";

const router = Router()

router.post("/auth", login)

router.delete("/auth/:session_id", logout)

export default router