import { Router } from "express";

import { createUser, createMainUser } from "../controllers/users.controller.js";

const router = Router()

router.post("/users", createUser)

router.post("/users/:user_id", createMainUser)

export default router