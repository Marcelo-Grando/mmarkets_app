import { Router } from "express";

import { getPagesInfo } from "../controllers/pages.controller.js";

const router = Router()

router.get("/pages/:roles", getPagesInfo)

export default router