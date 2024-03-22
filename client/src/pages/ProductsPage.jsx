import SelectedList from "../components/SelectedList"

export default function ProductsPage() {
  return (
    <SelectedList paths={[{"path": "default", "label": "products"}, {"path": "categories", "label": "categories"}, {"path": "create-products", "label": "create products"}]}/>
  )
}
