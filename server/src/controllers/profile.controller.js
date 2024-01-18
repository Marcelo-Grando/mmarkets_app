import {pool} from "../db.js"
import { tryCatch } from "../utils/tryCatch.js"

export const getProfile = tryCatch(async (req, res) => {
    const {user_id} = req.params

    console.log('sessinon id',req.session)

    const [user_data] = await pool.query("SELECT * FROM session WHERE session_id = ?", [session_id])

    console.log("user_data de getUserQueryData", user_data)

    const [[main_profile]] = await pool.query("SELECT u.user_id, u.email, u.roles, u.market_id, e.name, e.lastname, e.dni FROM users u INNER JOIN employees e ON u.user_id = e.employee_id WHERE u.roles = 'main' AND u.user_id = ?", [user_id]) 

    const [[seller_profile]] = await pool.query("SELECT u.user_id, u.email, u.roles, u.market_id, e.name, e.lastname, e.dni FROM users u INNER JOIN employees e ON u.user_id = e.employee_id WHERE u.roles = 'seller' AND u.user_id = ?", [user_id])

    const [[admin_profile]] = await pool.query("SELECT u.user_id, u.email, u.roles, u.market_id, e.name, e.lastname, e.dni FROM users u INNER JOIN employees e ON u.user_id = e.employee_id WHERE u.roles = 'admin' AND u.user_id = ?", [user_id])

    if(main_profile) res.json(main_profile)   

    if(seller_profile) res.json(seller_profile)  

    if(admin_profile) res.json(admin_profile)  
}) 

export const getUserQueryData = tryCatch(async (req, res) => {
    console.log('sessinon id',req)

    //const [user_data] = await pool.query("SELECT * FROM session WHERE session_id = ?", [])

    console.log("user_data de getUserQueryData", user_data)

    res.json("finish getUserData")
}) 