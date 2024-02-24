import { useQueryData } from "../../hooks/useQueryData"
import { getProducts } from "../../api/Products"
import { useState, useEffect } from "react"
import { Box } from "@mui/material"

import ResponsiveTable from "../../components/ResponsiveTable"

export default function Products() {
  const {market_id} = useQueryData()
  const [products, setProducts] = useState(null)
  const [productsFormat, setProductFormat] = useState(null)

  const loadProducts = async () => {
    const response = await getProducts(market_id)
    setProducts(response.products)
    setProductFormat(response.productsFormat)
  }

  useEffect(() => {
    market_id && loadProducts()
  }, [market_id])
  
  return (
      products && <ResponsiveTable rows={products} rowsToSkip={['product_id', 'category_id', 'market_id']}/>
  )
}
