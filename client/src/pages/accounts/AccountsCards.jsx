import Card from "../../components/Card"

import { useEffect, useState } from "react"
import { getEmplooyeesAccounts } from "../../api/Accounts"
import { useQueryData } from "../../hooks/useQueryData"

export default function AccountsCards() {
    const {userData, loading, market_id} = useQueryData()

    return (
        <div>
          {loading && (<h3>loading...</h3>)}
          {
            market_id && (
               <Card/>
            )
          }
        </div>
      );
}
