import { Box } from "@mui/material";
import ResponsiveTable from "../components/ResponsiveTable"
import LateralMenu from "../components/LateralMenu";

import {useQueryData} from "../hooks/useQueryData"

import { getSalesByProducts } from "../api/Reports";
import { useEffect, useState } from "react";

export default function ReportsPage() {
  const {market_id} = useQueryData()
  const [salesByProducts, setSalesByProducts] = useState(null)
  const [salesByCategories, setSalesByCategories] = useState(null)
  const [salesBySellers, setSalesBySellers] = useState(null)

  const loadReports = async () => {
    const response = await getSalesByProducts(market_id)
    setSalesByProducts(response.salesByProducts)
    setSalesByCategories(response.salesByCategories)
    setSalesBySellers(response.salesBySellers)
  }

  useEffect(() => {
    market_id && loadReports()
  }, [market_id])

  console.log("SalesByProducts", salesByProducts)

  return (
    <LateralMenu />
    // <Box sx={{display: "flex", justifyContent: "space-around", flexWrap: "wrap"}}>
    //   <h3>SALES BY PRODUCTS</h3>
    //     {
    //       salesByProducts && <ResponsiveTable rows={salesByProducts} rowsToSkip={['product_id']} head={false}/>
    //     }
    //     <h3>SALES BY CATEGORIES</h3>
    //     {
    //       salesByCategories && <ResponsiveTable rows={salesByCategories} rowsToSkip={['category_id']}/>
    //     }
    //      <h3>SALES BY SELLERS</h3>
    //     {
    //       salesBySellers && <ResponsiveTable rows={salesBySellers} />
    //     }
    // </Box>
  )
}
