import "./App.css";

import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import UserHomePage from "./pages/UserHomePage";
import SalePage from "./pages/SalePage";
import RegisterPage from "./pages/RegisterPage";
import AccountsPage from "./pages/AccountsPage";
import AccountsCards from "./pages/accounts/AccountsCards";
import CreateAccounts from "./pages/accounts/CreateAccounts";
import ProductsPage from "./pages/ProductsPage";
import CategoriesPage from "./pages/products/CategoriesPage";
import Products from "./pages/products/Products";
import CreateProducts from "./pages/products/CreateProducts";
import TicketsPage from "./pages/TicketsPage";
import ReportsPage from "./pages/ReportsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route path="/user" element={<UserHomePage />}>
        <Route path="sale" element={<SalePage />} />
        <Route path="accounts" element={<AccountsPage />}>
          <Route path="" element={<AccountsCards />} />
          <Route path="create" element={<CreateAccounts />} />
        </Route>
        <Route path="products" element={<ProductsPage />}>
          <Route path="" element={<Products/>} />
          <Route path="categories" element={<CategoriesPage />}/>
          <Route path="create-products" element={<CreateProducts/>}/>
        </Route>
        <Route path="tickets" element={<TicketsPage/>}/>
        <Route path="reports" element={<ReportsPage/>}/>
      </Route>
      <Route path="/sale" element={<SalePage />} />
    </Routes>
  );
}

export default App;
