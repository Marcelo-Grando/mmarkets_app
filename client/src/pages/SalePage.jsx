import { useEffect, useState } from "react";

import { getProducts } from "../api/Products";
import { makeSale } from "../api/Sales";
import { useQueryData } from "../hooks/useQueryData";
import ResponsiveTable from "../components/ResponsiveTable";
import { useSaleData } from "../hooks/useSaleData";
import { Box } from "@mui/material";

export default function SalePage() {
  const { user_id, market_id, loading } = useQueryData();

  const [products, setProducts] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([])

  const loadProducts = async () => {
    const response = await getProducts(market_id);
    setProducts(response.products);
  };

  useEffect(() => {
    user_id && loadProducts();
  }, [market_id]);

  return (
    <>
      {loading && <h3>loading...</h3>}
      {products && (
        <Box>
          <Box sx={{ width: "60%", height: 200, border: 5 }}>
            {
              selectedProducts.map(product => <p>{product.product_id} {product.quantify}</p>)
            }
          </Box>
          <Box sx={{ width: "60%",  border: 5 }}>
            <ResponsiveTable
              rows={products}
              rowsToSkip={["product_id", "category_id", "market_id"]}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
            />
          </Box>
        </Box>
      )}
    </>
  );
}
