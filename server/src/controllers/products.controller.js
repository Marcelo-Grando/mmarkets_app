import {pool} from "../db.js"

const randomId = function (length = 6) {
    return Math.random()
      .toString(36)
      .substring(2, length + 2);
  };

export const getProducts = async (req, res) => {
    const {market_id} = req.params

    try {
        const [[products]] = await pool.query("SELECT * FROM products WHERE market_id = ?0,",[market_id])

        if(!products.length) return res.status(404).json({message: "Products not found"})

        res.json(products)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

export const createProduct = async (req, res) => {
    const {market_id} = req.params
    const {name, description, price, expiration, category_id} = req.body

    try {
        const product_id = randomId(12)

        const [response] = await pool.query("INSERT INTO products (product_id, name, description, price, expiration, category_id, market_id) VALUES (?, ?, ?, ?, ?, ?, ?)", [product_id, name, description, price, expiration, category_id, market_id])

        res.status(201).json({message: "Created product"})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}