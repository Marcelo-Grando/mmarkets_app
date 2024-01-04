import { useLocation } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"

import SellerHomePage from "./SellerHomePage"
import MainHomePage from "./MainHomePage"
import AdminHomePage from "./AdminHomePage"


export default function UserHomePage() {
  const [userData, setUserData] = useState()


    const {state} = useLocation()

    useEffect(() => {
      setUserData(state.userData)
    }, [userData])

    console.log(userData)

    const {name, lastname, email, dni, roles, user_id, market_id} = state.userData

    if(roles === "seller") {
      return <SellerHomePage userData={userData}/>
    }
}
