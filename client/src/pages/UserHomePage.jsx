import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import SellerHomePage from "./SellerHomePage";
import MainHomePage from "./MainHomePage";
import AdminHomePage from "./AdminHomePage";

export default function UserHomePage() {
  const { state } = useLocation();

  const { roles } = state.userData;

  console.log(state.userData)


  switch (roles) {
    case "seller":
      return <SellerHomePage userData={state.userData} />

    default:
      return <p>404 NOT FOUND</p>
      break;
  }
}
