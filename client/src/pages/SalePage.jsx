import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { getProducts } from "../api/Products";
import { makeSale } from "../api/Sales";

export default function SalePage() {
  const [userData, setUserData] = useState();
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProductsView, setSelectedProductsView] = useState([]);
  const [selectedProductsIds, setSelectedProductsIds] = useState([]);
  const [amountSale, setAmountSale] = useState([0]);
  const [error, setError] = useState();

  const { state } = useLocation();

  const { market_id, user_id } = state.userData;

  async function loadProducts() {
    const response = await getProducts(market_id);
    setProducts(response.data);
  }

  const setUser = () => {
    setUserData({ market_id, user_id });
  };

  useEffect(() => {
    loadProducts();
    setUser();
  }, []);

  const addProductsIdsToSale = (product_id) => {
    setSelectedProductsIds([...selectedProductsIds, product_id]);
  };

  const addProductsToSale = (product_id) => {
    const repeatedProducts = selectedProductsIds.includes(product_id);

    if (!repeatedProducts) {
      setSelectedProducts([
        ...selectedProducts,
        { product_id: product_id, quantify: 1 },
      ]);
      return;
    }

    const reducedProducts = selectedProducts.map((product) => {
      if (product.product_id === product_id) {
        return {
          product_id: product.product_id,
          quantify: product.quantify + 1,
        };
      }
      return product;
    });

    setSelectedProducts(reducedProducts);
  };

  const addProductsForSaleView = async (product) => {
    const repeatedProducts = selectedProductsIds.includes(product.product_id);

    if (!repeatedProducts) {
      setSelectedProductsView([
        ...selectedProductsView,
        {
          product_id: product.product_id,
          name: product.name,
          description: product.description,
          category_name: product.category_name,
          price: product.price,
          quantify: 1,
        },
      ]);
      setAmountSale([...amountSale, Number(product.price)]);
      return;
    }

    const reducedProducts = selectedProductsView.map((p) => {
      if (p.product_id === product.product_id) {
        setAmountSale([...amountSale, Number(p.price)]);
        return {
          product_id: p.product_id,
          name: p.name,
          description: p.description,
          category_name: p.category_name,
          price: p.price,
          quantify: p.quantify + 1,
        };
      }
      return p;
    });

    setAmountSale([...amountSale, Number(product.price)]);

    setSelectedProductsView(reducedProducts);
  };

  const sendSale = async (market_id, user_id, sale) => {
    try {
      const response = await makeSale(market_id, user_id, sale);
      setSelectedProducts([]);
      setSelectedProductsIds([]);
      setSelectedProductsView([]);
      setAmountSale([0]);
      setError();
    } catch (error) {
      setError({
        status: error.response.status,
        message: error.response.data.message,
      });
    }
  };

  return (
    <section>
      <div className="products-card">
        <table>
          <tbody>
            {products.map((product, index) => {
              return (
                <tr
                  key={index}
                  onClick={() => {
                    addProductsIdsToSale(product.product_id);
                    addProductsToSale(product.product_id);
                    addProductsForSaleView(product);
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.category_name}</td>
                  <td>$ {product.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="sale-card">
        <table>
          <caption>Sale</caption>
          <tbody>
            {selectedProductsView?.map((product, index) => {
              return (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.category_name}</td>
                  <td>$ {product.price}</td>
                  <td>x {product.quantify}</td>
                  <td>$ {product.price * product.quantify}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <div className="amount-row">
              <h4>
                amount: ${" "}
                <span>{amountSale?.reduce((acc, curr) => acc + curr)}</span>
              </h4>
            </div>
            <div>
              <button
                onClick={() => {
                  sendSale(userData.market_id, userData.user_id, {
                    products: selectedProducts,
                    payment_type: 1,
                  });
                }}
              >
                sell
              </button>
              <button>cancel</button>
            </div>
          </tfoot>
        </table>
        {error && <span>{`${error.message}`}</span>}
      </div>
    </section>
  );
}
