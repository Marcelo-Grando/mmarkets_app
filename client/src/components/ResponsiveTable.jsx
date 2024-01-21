import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function ResponsiveTable(props) {

  return (
    <Table sx={{ minWidth: 500 }} aria-label="simple table">
      <TableHead>
        <TableRow className="titles">
            {
                props.heads.map((head) => (
                    <TableCell size="small">{head}</TableCell>
                ))
            }
        </TableRow>
      </TableHead>
      <TableBody>
        {props.rows.map((row, index) => (
          <TableRow className="row" key={index} size="small">
            {Object.values(row).map((elem) => (
              <TableCell className="cell" size="small" component="th" scope="row">
                {elem}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
