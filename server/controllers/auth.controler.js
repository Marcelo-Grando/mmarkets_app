import { pool } from "../db.js";

export const login = async (req, res) => {
    const {email, password} = req.body

    try {
        const [[{user_id}]] = await pool.query("SELECT user_id FROM users WHERE email = ?", [email])

        if(!user_id) {
            return res.status(401).json({message: "User dont not exist"})
        }

        const [[{user_password}]] = await pool.query("SELECT password AS user_password FROM users WHERE user_id = ?", [user_id])

        if(user_password.toString() != password) {
            return res.status(401).json({message: "Incorrect Password"})
        }

        req.session.user_id = user_id

        res.json({user_id: user_id})
    } catch (error) {
        res.json(error)
    }
}