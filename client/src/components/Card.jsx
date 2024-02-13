import  Box  from "@mui/material/Box"
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useEmployeeData } from "../hooks/useEmployeeData";
import { useQueryData } from "../hooks/useQueryData";
import { useState } from "react";

export default function Card() {
    const {loading, employeesData} = useEmployeeData()

    console.log("employeesdata", employeesData)

  return (
    <div>
        {loading && (<h3>loading...</h3>)}
        {
          employeesData.map((elem, index) => (<Box key={index} sx={{}}>
            <Typography variant="h6">{`${elem.name} ${elem.lastname}`}</Typography>
            <Typography variant="body2">{elem.dni}</Typography>
            <Typography></Typography>
            <Typography></Typography>
            <Typography></Typography>
          </Box>))
        }
    </div>
  )
}
