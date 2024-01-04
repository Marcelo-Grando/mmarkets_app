import { useLocation } from "react-router-dom"

import SellerHomePage from "./SellerHomePage"
import MainHomePage from "./MainHomePage"
import AdminHomePage from "./AdminHomePage"

export default function UserHomePage() {

    const {state} = useLocation()

    const {name, lastname, email, dni, roles, user_id, market_id} = state.userData

    if(roles === "seller") {
      return <SellerHomePage userData={state.userData}/>
    }
}
