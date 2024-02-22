import { Box } from "@mui/material";

import {useQueryData} from "../hooks/useQueryData"

import { getSalesByProducts } from "../api/Reports";
import { useEffect, useState } from "react";

export default function ReportsPage() {
  const {market_id} = useQueryData()
  const [salesByProducts, setSalesByProducts] = useState()

  const loadSalesByProducts = async () => {
    const response = await getSalesByProducts(market_id)
    setSalesByProducts(response)
  }

  useEffect(() => {
    market_id && loadSalesByProducts()
  }, [market_id])

  console.log("SalesByProducts", salesByProducts)

  return (
    <Box sx={{display: "flex", justifyContent: "space-around", flexWrap: "wrap"}}>
        {
          salesByProducts && salesByProducts.map((elem, index) => {
            return <Box sx={{minWidth: "15%",border: 1, p: 1, m: 1}}>
              <p>{elem.name} {elem.description}</p>
              <h5>sold unitis: {elem.quantify}</h5>
              <p>Total: ${elem.amount}</p>
            </Box>
          })
        }
    </Box>
  )
}
