import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function TestTabs(props) {
  const [value, setValue] = useState(0)
  const {paths} = props

  const navigate = useNavigate();

  const handleClick = (path, value) => {
    if(path === 'default') {
      setValue(value)
      navigate("")
      return
    }
    setValue(value)
    navigate(path)
  };

  return (
      <Box
        sx={{
          width: 2000,
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
            paths.map((elem, index) => (<Tab key={index} onClick={() => handleClick(`${elem.path}`, index)} label={`${elem.label}`} />))
          }
        </Tabs>
        <Outlet />
      </Box>
  );
}
