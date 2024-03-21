import { useQueryData } from "../../hooks/useQueryData"
import { getProducts } from "../../api/Products"
import { useState, useEffect } from "react"
import { Box } from "@mui/material"

import ResponsiveTable from "../../components/ResponsiveTable"
import ScrollBox from "../../components/ScrollBox"

export default function Products() {
  const {market_id} = useQueryData()
  const [products, setProducts] = useState(null)
  const [productsFormat, setProductFormat] = useState(null)

  const anchuraViewport = window.innerWidth;

  const loadProducts = async () => {
    const response = await getProducts(market_id)
    setProducts(response.products)
    setProductFormat(response.productsFormat)
  }

  useEffect(() => {
    market_id && loadProducts()
  }, [market_id])

  console.log("pro", products)
  
  return (
      // products && <Box sx={{height: alturaViewport - 70,overflowY: "scroll",
      // "&::-webkit-scrollbar": {
      //   width: "0.5em",
      // },
      // "&::-webkit-scrollbar-thumb": {
      //   backgroundColor: "rgba(0,0,0,.5)",
      // },
      // "&::-webkit-scrollbar-corner": {
      //   backgroundColor: "#fff",
      // },}}>
      //   <ResponsiveTable rows={products} rowsToSkip={['product_id', 'category_id', 'market_id']}/>
      // </Box>
      products && <ScrollBox>
        <ResponsiveTable rows={products} rowsToSkip={['product_id', 'category_id', 'market_id']}/>
      </ScrollBox>
  )
}
