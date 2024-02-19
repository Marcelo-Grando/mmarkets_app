import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";

export default function ResponsiveTable(props) {
  const { rows, rowsToSkip, selectedProducts, setSelectedProducts } = props;

  const filteredRows = rows.map((row) => {
    const rowCopy = { ...row };
    rowsToSkip.forEach((elem) => {
      delete rowCopy[elem];
    });
    return rowCopy;
  });

  const filterRow = (row) => {
    const rowCopy = { ...row };
    rowsToSkip.forEach((elem) => {
      delete rowCopy[elem];
    });
    return rowCopy;
  }

  const add = (row) => {
    let changes = false
    const groupedProducts = selectedProducts.map(product => {
      if(product.product_id === row.product_id) {
        product = {product_id: product.product_id, quantify: product.quantify + 1}
        changes = true
        return product
      }
      return product
    })
    if(changes) {
      setSelectedProducts(groupedProducts)
      return
    }
    setSelectedProducts([...selectedProducts, {product_id: row.product_id, quantify: 1}])
  }

  const rowsHeads = Object.keys(filteredRows[0]);

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow className="titles">
            {rowsHeads.map((head, index) => (
              <TableCell key={index} size="small">
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            const filteredRow = filterRow(row)
            return (
              <TableRow className="row" key={index} size="small">
                {Object.values(filteredRow).map((elem, index) => (
                  <TableCell
                    onClick={() => add(row)}
                    key={index}
                    className="cell"
                    size="small"
                    component="th"
                    scope="row"
                  >
                    {elem}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
