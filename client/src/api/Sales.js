import { instanceAxios } from "./axios"

export const makeSale = async (market_id, employee_id, products, payment_type) => 
    await instanceAxios.post(`/sales/${market_id}/${employee_id}`, {products: products, payment_type: payment_type})