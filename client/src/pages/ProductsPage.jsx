import { Box } from "@mui/material";
import { Outlet, useOutletContext } from "react-router-dom";

export default function ProductsPage() {

  const [open] = useOutletContext();

  return (
    <Box sx={{ width: "100%" }}>
      <Outlet context={[open]} />
    </Box>
  );
}
