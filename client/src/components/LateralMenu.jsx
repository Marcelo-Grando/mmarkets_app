import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function LateralMenu(props) {
    const {menuItems} = props
  const [value, setValue] = useState(0)

  return (
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider", width: 1 / 5 }}
        >
          {
            menuItems.map((item, index) => (<Tab key={index} label={`${item.label}`} />))
          }
        </Tabs>
        <Box>

        </Box>
      </Box>
  );
}