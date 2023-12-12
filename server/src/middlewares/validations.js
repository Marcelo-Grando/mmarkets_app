import {pool} from "../db.js"

export const validateProduct = async (req, res, next) => {
    const {name, description, price, category_id} = req.body 

    if(!name || !description || !price  || !category_id) return res.status(400).json({message: `Incomplete fields`})

    next()
}