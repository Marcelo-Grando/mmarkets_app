import { useEffect, useState } from "react"

import { getProducts } from "../api/Products"

import { useQueryData } from "./useQueryData"

export const useSaleData =  () => {
    const {market_id, loading} = useQueryData()
    const [products, setProducts] = useState()


    const loadProducts = async (market_id) => {
            const response = await getProducts(market_id)
        setProducts(response)
    }

    console.log("useSaleData",market_id, loading, products)

    useEffect(() => {
        market_id && loadProducts(market_id)
    }, [market_id])

    return {products}
}