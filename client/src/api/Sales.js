import { instanceAxios } from "./InstanceAxios";

export const makeSale = async (
  market_id,
  employee_id,
  products,
  payment_type,
  productsDetaills
) =>
  await instanceAxios
    .post(`/sales/${market_id}/${employee_id}`, {
      products,
      payment_type,
      productsDetaills,
    })
    .then((response) => response.data)
    .catch((err) => {
      return {
        status: err.response.status,
        message: err.response.data.message,
      };
    });
