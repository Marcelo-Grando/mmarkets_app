import  Box  from "@mui/material/Box"
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useEmployeeData } from "../hooks/useEmployeeData";
import { useQueryData } from "../hooks/useQueryData";
import { useState } from "react";

export default function Card() {
    const {loading, employeesData} = useEmployeeData()

    const except = ['user_id', 'market_id']

  return (
    <Box sx={{p: 1, display: "flex", justifyContent: "space-evenly"}}>
        {loading && (<h3>loading...</h3>)}
        {
          employeesData.map((elem, index) => (<Box key={index} sx={{border: 1, p:1, width:"max-content"}}> {
             Object.keys(elem).map((e, i) => {
              if (!except.includes(e)) {
                return <Typography key={i} variant="body2">{e[0].toUpperCase() + e.slice(1)}: {elem[e]}</Typography>
              }
             })
          }
            {/* <Typography variant="h6">{`${elem.name} ${elem.lastname}`}</Typography>
            <Typography variant="body2">{elem.dni}</Typography>
            <Typography></Typography>
            <Typography></Typography>
            <Typography></Typography> */}
          </Box>))
        }
    </Box>
  )
}
