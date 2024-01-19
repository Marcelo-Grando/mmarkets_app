import {useEffect, useState} from "react"
import {test} from "../api/Auth"

export const useQueryData = () => {
    const [userData, setUserData] = useState()

    const loadData = async () => {
        const response = await test()
        console.log("response en loadData",response)
        setUserData(response.data)
    }

    useEffect(() => {
        loadData()
    }, [])


    return {userData}
}