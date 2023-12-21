import {pool} from "../db.js"
import {tryCatch} from "../utils/tryCatch.js"
import { ClientError } from "../errors/Errors.js"

export const getPaymentTypes = tryCatch(async (req, res) => {
    const {market_id} = req.params

    const [payment_types] = await pool.query("SELECT * FROM payment_types WHERE market_id = ?", [market_id])

    if(!payment_types.length) throw new ClientError("There are still no payment types")

    res.json(payment_types)
})

export const updatePaymentType = tryCatch(async(req, res) => {
    const {market_id, paymentType_id} = req.params

    const [response] = await pool.query("UPDATE payment_types SET name = IFNULL(?, name), SET tax_rate = IFNULL(?, tax_rate) WHERE payment_type_id = ? AND market_id = ?", [paymentType_id, market_id])

    const [[modifyPaymentType]] = await pool.query("SELECT * FROM payment_types WHERE payment_type_id = ? AND market_id = ?", [paymentType_id, market_id])

    res.json(modifyPaymentType)
})

export const createPaymentType = tryCatch(async (req, res) => {
    const {market_id} = req.params
    const {name, tax_rate} = req.body

    const [response] = await pool.query("INSERT INTO payment_types (name, tax_rate, market_id) VALUES ( ?, ?, ?)", [name, tax_rate, market_id])

    res.status(201).json({message: "Payment_type Created"})
})

export const deletePaymentType = tryCatch(async (req, res) => {
    const {market_id, paymentType_id} = req.params

    const [[response]] = await pool.query("DELETE FROM payment_types WHERE payment_type_id = ? AND market_id = ?", [paymentType_id, market_id])

    res.sendStatus(204)
})
