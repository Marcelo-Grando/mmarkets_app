import { Router } from "express";

import { getUsers, createUser, createMainUser, deleteUser } from "../controllers/users.controller.js";

const router = Router()

router.get("/users/:market_id", getUsers)

router.post("/users", createUser)

router.post("/users/:user_id", createMainUser)

router.delete("/users/:market_id/:user_id", deleteUser)

export default router