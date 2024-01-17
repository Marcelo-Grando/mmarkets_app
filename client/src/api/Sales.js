import { instanceAxios } from "./axios"

export const makeSale = async (market_id, employee_id, saleCard) => 
    await instanceAxios.post(`/sales/${market_id}/${employee_id}`, saleCard)