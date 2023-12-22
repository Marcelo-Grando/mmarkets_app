import {pool} from "../db.js"
import { tryCatch } from "../utils/tryCatch.js"

export const getProfile = tryCatch(async (req, res) => {
    const {user_id} = req.params

    const [[main_profile]] = await pool.query("SELECT * FROM users u INNER JOIN markets m ON u.user_id = m.market_id WHERE u.user_id = ?", [user_id]) 

    const [[seller_profile]] = await pool.query("SELECT * FROM users u INNER JOIN employees e ON u.user_id = e.employee_id WHERE u.roles = 'seller' AND u.user_id = ?", [user_id])

    const [[admin_profile]] = await pool.query("SELECT u.email, u.roles, u.market_id, e.name, e.lastname, e.dni FROM users u INNER JOIN employees e ON u.user_id = e.employee_id WHERE u.roles = 'admin' AND u.user_id = ?", [user_id])

    if(main_profile) res.json(main_profile)   

    if(seller_profile) res.json(seller_profile)  

    if(admin_profile) res.json(admin_profile)  
}) 