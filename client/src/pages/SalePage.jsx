import { useEffect, useState } from "react";

import { getProducts } from "../api/Products";
import { makeSale } from "../api/Sales";
import { useQueryData } from "../hooks/useQueryData";
import ResponsiveTable from "../components/ResponsiveTable";
import { useSaleData } from "../hooks/useSaleData";
import { Box, Button } from "@mui/material";

export default function SalePage() {
  const { user_id, market_id, loading } = useQueryData();

  const [products, setProducts] = useState(null);
  const [productsFormat, setProductsFormat] = useState(null)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [saleItems, setSaleItems] = useState([])

  const loadProducts = async () => {
    const response = await getProducts(market_id);
    setProducts(response.products);
    setProductsFormat(response.productsFormat)
  };


  useEffect(() => {
    user_id && loadProducts();
  }, [market_id]);

  const addProductsForSale = (row) => {
    const {name, description, price} = row
    let changes = false
    let changesF = false
    const copySelectedProducts = [...selectedProducts]
    const copyFormatProducts = [...productsFormat]

    !selectedProducts.length && setSelectedProducts([...selectedProducts, {product_id: row.product_id, quantify: 1}])

    const groupedProducts = copySelectedProducts.map(product => {
      if(product.product_id === row.product_id) {
        changes = true
        return {product_id: product.product_id, quantify: product.quantify + 1}
      }
      return product
    })
    const groupedProductsForSale = copySelectedProducts.map(product => {
      if(product.product_id === row.product_id) {
        changesF = true
        return {name, description, price, quantify: product.quantify + 1}
      } 
        const productFound = copyFormatProducts.find(elem => elem.product_id === product.product_id)
        return {name: productFound.name, description: productFound.description, price: productFound.price, quantify: product.quantify}
    })
    if(changes) {
      setSelectedProducts(groupedProducts)
    }
    if(changesF) {
      setSaleItems(groupedProductsForSale)
    }
    if(!changes && !changes) {
      setSelectedProducts([...selectedProducts, {product_id: row.product_id, quantify: 1}])
      setSaleItems([...saleItems, {name, description, price, quantify: 1}])
    }
  }

  const saleSubmit = async () => {
    const response = await makeSale(market_id, user_id, selectedProducts, 3)
    console.log("TICKET", response.data)
    setSaleItems([])
    setSelectedProducts([])
  }

  return (
    <>
      {loading && <h3>loading...</h3>}
      {products && (
        <Box>
          <Box sx={{ width: "60%", height: 200, border: 5 }}>
            {
              saleItems.map((product, index) => <p key={index}> {product.name} {product.description} $ {product.price} x{product.quantify}</p>)
            }
            <Button onClick={saleSubmit}>MAKE SELL</Button>
          </Box>
          <Box sx={{ width: "60%",  border: 5 }}>
            <ResponsiveTable
              rows={products}
              rowsToSkip={["product_id", "category_id", "market_id"]}
              onClick={addProductsForSale}
            />
          </Box>
        </Box>
      )}
    </>
  );
}
