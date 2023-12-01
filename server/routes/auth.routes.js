import { Router } from "express";

import { login } from "../controllers/auth.controler.js";

const router = Router()

router.post("/auth", login)

export default router