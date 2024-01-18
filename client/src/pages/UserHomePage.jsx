import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { test } from "../api/Auth";

import { getUserQueryData } from "../api/Profiles";

import { useQueryData } from "../hooks/useQueryData";

import SellerHomePage from "./SellerHomePage";
import MainHomePage from "./MainHomePage";
import AdminHomePage from "./AdminHomePage";

export default function UserHomePage() {
  const { state } = useLocation();
  const {userData} = useQueryData()

  const { roles } = state.userData;

  const [data, setData] = useState()

  // const loadData = async () => {
  //   const response = await test()
  //   console.log(response)
  //   setData(response.data)
  // }

  // useEffect(()=> {
  //   loadData()
  // }, [])

  // console.log('data', data)

  console.log("suerData", userData)

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
