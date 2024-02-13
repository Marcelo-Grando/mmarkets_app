import TestTabs from "../components/TestTabs"
import SelectedList from "../components/SelectedList"

export default function ProductsPage() {
  return (
    <SelectedList paths={[ {path: "default", label: "categories"}, {path: "list", label: "products"}, {path: "create-products", label: "create products"}]}/>
  )
}
