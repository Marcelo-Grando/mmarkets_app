import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import SellerHomePage from "./SellerHomePage";
import MainHomePage from "./MainHomePage";
import AdminHomePage from "./AdminHomePage";

export default function UserHomePage() {
  const [userData, setUserData] = useState();

  const { state } = useLocation();

  useEffect(() => {
    setUserData(state.userData);
  }, [userData]);

  const { roles } = state.userData;

  if (roles === "seller") {
    return <SellerHomePage userData={userData} />;
  }
}
