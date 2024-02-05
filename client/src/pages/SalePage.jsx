import { useEffect, useState } from "react";

import { getProducts } from "../api/Products";
import { makeSale } from "../api/Sales";
import { useQueryData } from "../hooks/useQueryData";
import ResponsiveTable from "../components/ResponsiveTable";
import { useSaleData } from "../hooks/useSaleData";
import { Box } from "@mui/material";

export default function SalePage() {
  const {products} = useSaleData()

  console.log(products)

  return (
    <p>SALE</p>
    // <div className="container-products-table">
    //   <ResponsiveTable rows={products} heads={["name", "description", "category_name", "price"]}/>
    // </div>
  //   <div className="sale-container">
  //     <section>
  //       <div className="sale-card">
  //         <div className="products-ctn">
  //           <table>
  //             <tbody>
  //               {selectedProductsView?.map((product, index) => {
  //                 return (
  //                   <tr key={index}>
  //                     <td>{product.name}</td>
  //                     <td>{product.description}</td>
  //                     <td>{product.category_name}</td>
  //                     <td>$ {product.price}</td>
  //                     <td>x {product.quantify}</td>
  //                     <td>$ {product.price * product.quantify}</td>
  //                   </tr>
  //                 );
  //               })}
  //             </tbody>
  //           </table>
  //         </div>

  //         {error && <span>{`${error.message}`}</span>}
  //         <div className="amount-row">
  //           <h4>
  //             amount: ${" "}
  //             <span>{amountSale?.reduce((acc, curr) => acc + curr)}</span>
  //           </h4>
  //           <h4>
  //             date: <span>2024-01-08</span>
  //           </h4>
  //           <div className="btn-container">
  //             <button className="btn-sell"
  //               onClick={() => {
  //                 sendSale(userData.market_id, userData.user_id, {
  //                   products: selectedProducts,
  //                   payment_type: 1,
  //                 });
  //               }}
  //             >
  //               sell
  //             </button>
  //             <button className="btn-cancel">cancel</button>
  //           </div>
  //           <div></div>
  //         </div>
  //       </div>
  //       <div className="products-card">
  //         <table>
  //           <tbody>
  //             {products.map((product, index) => {
  //               return (
  //                 <tr
  //                   key={index}
  //                   onClick={() => {
  //                     addProductsIdsToSale(product.product_id);
  //                     addProductsToSale(product.product_id);
  //                     addProductsForSaleView(product);
  //                   }}
  //                 >
  //                   <td>{index + 1}</td>
  //                   <td>{product.name}</td>
  //                   <td>{product.description}</td>
  //                   <td>{product.category_name}</td>
  //                   <td>$ {product.price}</td>
  //                 </tr>
  //               );
  //             })}
  //           </tbody>
  //         </table>
  //       </div>
  //     </section>
  //   </div>
  );
}
