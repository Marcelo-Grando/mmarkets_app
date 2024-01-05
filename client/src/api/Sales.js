import axios from "axios";

export const makeSale = async (market_id, employee_id, saleCard) => 
    await axios.post(`http://localhost:4000/api/sales/${market_id}/${employee_id}`, saleCard)