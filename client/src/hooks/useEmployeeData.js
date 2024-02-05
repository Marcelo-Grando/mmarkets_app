import { useEffect, useState } from "react"
import { getEmplooyeesAccounts } from "../api/Accounts"
import { test } from "../api/Auth"

export const useEmployeeData = () => {
    const [market_id, setMartket_id] = useState()
    const [employeesData, setEmployeeData] = useState([])
    const [loading, setLoading] = useState(true);
    
    const loadMarketId= async () => {
        const response = await test()
        setMartket_id(response.data.market_id)
        setLoading(null)
    }

    const loadEmployeeData = async () => {
        if(market_id) {
            const response = await getEmplooyeesAccounts(market_id)
        setEmployeeData(response.data)
        }
    }

    useEffect(() => {
        loadMarketId()
       loadEmployeeData()
    }, [market_id])

    return {employeesData}
}