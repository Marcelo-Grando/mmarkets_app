import { useEffect, useState } from "react";
import { useQueryData } from "../../hooks/useQueryData";
import Form from "../../components/Form";
import { createProduct } from "../../api/Products";
import { getCategories } from "../../api/Categories";

const inpustData = [
  {
    name: "name",
    type: "text",
    label: "Name",
  },
  {
    name: "description",
    type: "text",
    label: "Description",
  },
  {
    name: "price",
    type: "number",
    label: "Price",
  },
  {
    name: "expiration",
    type: "text",
    label: "Expiration",
  },
  {
    name: "category",
    type: "select",
    label: "Category",
  },
];

const initialState = {
  name: "",
  description: "",
  price: "",
  expiration: "",
  category_id: "",
};

export default function CreateProducts() {
  const { market_id } = useQueryData();
  const [categories, setCategories] = useState(null);
  const [currencies, setCurrencies] = useState(null);

  const loadCategories = async () => {
    const response = await getCategories(market_id);
    const curr = response.map((elem) => ({
      value: elem.category_id,
      label: elem.name,
    }));
    setCurrencies(curr);
    setCategories(response);
  };

  useEffect(() => {
    market_id && loadCategories();
  }, [market_id]);

  return (
    currencies && (
      <Form
        title="Craete Product"
        inpustData={inpustData}
        btn_title="create"
        functionSubmit={createProduct}
        initialState={initialState}
        market_id={market_id}
        currencies={currencies}
      />
    )
  );
}
