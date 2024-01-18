import { Router } from "express";
import { getProfile, getUserQueryData } from "../controllers/profile.controller.js";

const router = Router()

router.get("/profile/:user_id", getProfile)

router.get("/profile/data", getUserQueryData)

export default router