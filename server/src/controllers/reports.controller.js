import {pool} from "../db.js"
import { tryCatch } from "../utils/tryCatch.js"

export const getSoldProducts = tryCatch(async (req, res) => {
    const {market_id} = req.params

        const [sold_products] = await pool.query("SELECT * FROM sold_products WHERE market_id = ?", [market_id])
        const [tickets] = await pool.query("SELECT * FROM tickets WHERE market_id = ?", [market_id])

        const [salesByProducts] = await pool.query("SELECT product_id, name, description, category_name, sum(price * quantify) AS amount FROM sold_products WHERE market_id = ? GROUP BY product_id, name, description, category_name", [market_id])

        const [salesByCategories] = await pool.query("SELECT category_name, sum(price * quantify) AS amount FROM sold_products WHERE market_id = ? GROUP BY category_name", [market_id])

        const [salesBySellers] = await pool.query("SELECT employee_id, employee_name, sum(price * quantify) AS amount FROM sold_products WHERE market_id = ? GROUP BY employee_id, employee_name", [market_id])

        res.json({salesByProducts, salesByCategories, salesBySellers})
})