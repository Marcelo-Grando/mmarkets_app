import axios from "axios";

export const getProducts = async (market_id) => 
    await axios.get(`http://localhost:4000/api/products/${market_id}`)
        .then(response => response.data)
        .catch(err => err)