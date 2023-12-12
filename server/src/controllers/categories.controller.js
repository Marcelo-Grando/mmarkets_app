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
    const {market_id, category_id} = req.params

    try {
        const [[category]] = await pool.query("SELECT * FROM categories WHERE market_id = ? AND category_id = ?", [market_id, category_id])

        if(!category) return res.status(404).json({message: `Category not found`})

        res.json(category)
    } catch (error) {
        console.error(error)
        res.send(error)
    }
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
    const {market_id, category_id} = req.params
    const {name} = req.body

    try {
        const [response] = await pool.query("UPDATE categories SET name = IFNULL(?, name) WHERE market_id = ? AND category_id = ?", [name, market_id, category_id])

        const [[category]] = await pool.query("SELECT * FROM categories WHERE market_id = ? AND caegory_id = ?", [market_id, category_id])

        res.json(category)
    } catch (error) {
        res.send(error)
    }
}

export const deleteCategory = async (req, res) => {
    const {market_id, category_id} = req.params

    try {
        const [response] = await pool.query("DELETE FROM categories WHERE market_id = ? AND category_id = ?", [market_id, category_id])

        res.sendStatus(204)
    } catch (error) {
        res.send(error)
    }
}