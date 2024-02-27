import { useEffect, useState } from "react";

import { getProducts } from "../api/Products";
import { makeSale } from "../api/Sales";
import { useQueryData } from "../hooks/useQueryData";
import ResponsiveTable from "../components/ResponsiveTable";
import { useSaleData } from "../hooks/useSaleData";
import { Box, Button, TextField, Typography } from "@mui/material";

let anchuraViewport = window.innerWidth;
let alturaViewport = window.innerHeight;

export default function SalePage() {
  const { user_id, market_id, loading } = useQueryData();

  const [products, setProducts] = useState(null);
  const [productsFormat, setProductsFormat] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [saleItems, setSaleItems] = useState([]);
  const [ticket, setTicket] = useState(null);

  const loadProducts = async () => {
    const response = await getProducts(market_id);
    setProducts(response.products);
    setProductsFormat(response.productsFormat);
  };

  useEffect(() => {
    user_id && loadProducts();
  }, [market_id]);

  const addProductsForSale = (row) => {
    const { name, description, price } = row;
    let changes = false;
    let changesF = false;
    const copySelectedProducts = [...selectedProducts];
    const copyFormatProducts = [...productsFormat];

    !selectedProducts.length &&
      setSelectedProducts([
        ...selectedProducts,
        { product_id: row.product_id, quantify: 1 },
      ]);

    const groupedProducts = copySelectedProducts.map((product) => {
      if (product.product_id === row.product_id) {
        changes = true;
        return {
          product_id: product.product_id,
          quantify: product.quantify + 1,
        };
      }
      return product;
    });
    const groupedProductsForSale = copySelectedProducts.map((product) => {
      if (product.product_id === row.product_id) {
        changesF = true;
        return { name, description, price, quantify: product.quantify + 1 };
      }
      const productFound = copyFormatProducts.find(
        (elem) => elem.product_id === product.product_id
      );
      return {
        name: productFound.name,
        description: productFound.description,
        price: productFound.price,
        quantify: product.quantify,
      };
    });
    if (changes) {
      setSelectedProducts(groupedProducts);
    }
    if (changesF) {
      setSaleItems(groupedProductsForSale);
    }
    if (!changes && !changes) {
      setSelectedProducts([
        ...selectedProducts,
        { product_id: row.product_id, quantify: 1 },
      ]);
      setSaleItems([...saleItems, { name, description, price, quantify: 1 }]);
    }
  };

  const saleSubmit = async () => {
    const response = await makeSale(
      market_id,
      user_id,
      selectedProducts,
      3,
      saleItems
    );
    console.log("TICKET", response.data);
    setTicket(response.data);
    setSaleItems([]);
    setSelectedProducts([]);
  };

  const calculateTotal = (products) => {
    const allPrices = products.map(
      (item) => Number(item.price) * item.quantify
    );

    return allPrices.reduce((a, b) => a + b, 0);
  };

  console.log("first", saleItems);

  return (
    <>
      {loading && <h3>loading...</h3>}
      {products && (
        <Box>
          <Box
            sx={{
              width: "60%",
              height: (alturaViewport * 32) / 100,
              border: 5,
            }}
          >
            {saleItems &&
              saleItems.map((product, index) => (
                <p key={index}>
                  {" "}
                  {product.name} {product.description} $ {product.price} x
                  {product.quantify}
                </p>
              ))}
          </Box>
          <Box
            sx={{
              backgroundColor: "GrayText",
              border: 5,
              borderColor: "GrayText",
              display: "flex",
              width: "60%",
              height: (alturaViewport * 6) / 100,
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ marginInlineEnd: 2, backgroundColor: "white", p: 0.5 }}
            >
              Total: $ {calculateTotal(saleItems)}
            </Typography>
            <Button variant="contained" sx={{ p: 0.5, marginInlineEnd: 1 }} onClick={saleSubmit}>
              MAKE SELL
            </Button>
          </Box>
          <Box
            sx={{
              width: "60%",
              height: (alturaViewport * 44.5) / 100,
              border: 5,
              overflowY: "scroll",
              "&::-webkit-scrollbar": {
                width: "0.5em",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,.5)",
              },
              "&::-webkit-scrollbar-corner": {
                backgroundColor: "#fff",
              },
            }}
          >
            <ResponsiveTable
              rows={products}
              rowsToSkip={["product_id", "category_id", "market_id"]}
              onClick={addProductsForSale}
            />
          </Box>
          <Box>
            {
              // ticket && Object.keys(ticket).map((elem, index) => {
              //   if(elem != '_products') {
              //     return <Box>{elem}: {ticket[elem]}</Box>
              //   }
              // })
            }
          </Box>
        </Box>
      )}
    </>
  );
}
