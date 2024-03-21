import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";

export default function ResponsiveTable(props) {
  const { rows, rowsToSkip = [], onClick, head } = props;

  const filteredRows = rows.map((row) => {
    const rowCopy = { ...row };
    rowsToSkip.forEach((elem) => {
      delete rowCopy[elem];
    });
    return rowCopy;
  });

  const rowsHeads = Object.keys(filteredRows[0]);
  
  return (
    <TableContainer>
      <Table aria-label="simple table">
        {
          head && <TableHead>
          <TableRow className="titles">
            {rowsHeads.map((head, index) => (
              <TableCell key={index} size="small">
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        }
        <TableBody>
          {
            rows.map((row, index) => (
              <TableRow key={index} sx={{size: "small"}}>
               {
                 Object.keys(row).map((key, index) => {
                  if(!rowsToSkip.includes(key)) {
                    return <TableCell sx={{paddingY: 0.7, fontFamily: "'Commissioner', sans-serif"}} onClick={() => onClick(row)} key={index}>{row[key]}</TableCell>
                  }
                 })
               }
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
