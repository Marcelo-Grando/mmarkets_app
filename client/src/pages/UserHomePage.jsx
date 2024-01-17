import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { getUserId } from "../api/Accounts";

import SellerHomePage from "./SellerHomePage";
import MainHomePage from "./MainHomePage";
import AdminHomePage from "./AdminHomePage";

export default function UserHomePage() {
  const { state } = useLocation();

  const { roles } = state.userData;

  console.log(state)

  switch (roles) {
    case "seller":
      return <SellerHomePage userData={state.userData} />

    case "admin": 
      return <AdminHomePage userData={state.userData}/>

    default:
      return <p>404 NOT FOUND</p>
      break;
  }
}
