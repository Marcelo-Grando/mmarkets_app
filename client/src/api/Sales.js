import { instanceAxios } from "./axios"

export const makeSale = async (market_id, employee_id, products, payment_type, productsDetaills) => 
    await instanceAxios.post(`/sales/${market_id}/${employee_id}`, {products, payment_type, productsDetaills})