import { useLocation } from "react-router-dom";

import SellerHomePage from "./SellerHomePage";
import MainHomePage from "./MainHomePage";
import AdminHomePage from "./AdminHomePage";

export default function UserHomePage() {
  const { state } = useLocation();

  const { roles } = state.userData;

  switch (roles) {
    case "seller":
      return <SellerHomePage />

    case "admin": 
      return <AdminHomePage />

    default:
      return <p>404 NOT FOUND</p>
      break;
  }
}
