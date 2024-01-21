import {pool} from "../db.js"
import { tryCatch } from "../utils/tryCatch.js"

export const getPagesInfo = tryCatch(async (req, res) => {
    const {roles} = req.params

    const [pagesInfo] = await pool.query("SELECT * FROM pages_info")

    const rolPages = pagesInfo.filter((elem) => {
        if (elem.roles.includes(roles)) return elem
    })

    res.json(rolPages)
})