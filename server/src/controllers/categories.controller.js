import {pool} from '../db.js'

const randomId = function (length = 6) {
    return Math.random()
      .toString(36)
      .substring(2, length + 2);
  };

export const getCategories = async (req, res) => {
    const {market_id} = req.params

    try {
        const [categories] = await pool.query("SELECT * FROM categories WHERE market_id = ?", [market_id])

        if(!categories) return res.status(404).json({message: "Categories not found"})

        res.json(categories)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

export const getCategory = async (req, res) => {
    
}

export const createCategory = async (req, res) => {
    const {market_id} = req.params
    const {name} = req.body

    try {
        const category_id = randomId(12)

        const [response] = await pool.query("INSERT INTO categories (category_id, name, market_id, created) VALUES (?, ?, ?, NOW())", [category_id, name, market_id])

        res.status(201).json({message: "Category created"})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

export const updateCategory = async (req, res) => {
    
}

export const deleteCategory = async (req, res) => {
    
}