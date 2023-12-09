import {pool} from "../db.js"

export const verifySession = async (req, res, next) => {
    

    try {
        const session_id = req.session.id

    const [[activeSession]] = await pool.query("SELECT * from sessions WHERE session_id = ?", [session_id]) 

    if(!activeSession) return res.status(401).json({message: "There is not active session"})

    const [[{data}]] = await pool.query("SELECT data FROM sessions WHERE session_id = ?", [session_id])

    const {user} = JSON.parse(data)

    console.log(user)


    next()
    } catch (error) {
        console.error(error)
        res.send(error)
    }
}