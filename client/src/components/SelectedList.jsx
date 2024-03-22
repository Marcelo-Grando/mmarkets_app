import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ButtonGroup,
  Button,
} from "@mui/material";

import { Outlet, useNavigate } from "react-router-dom";

import { useState } from "react";

export default function SelectedList({ paths }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = (path, index) => {
    if (path === "default") {
      setSelectedIndex(index);
      navigate("");
      return;
    }
    navigate(path);
    setSelectedIndex(index);
  };

  const navigate = useNavigate();

  return (
    <Box sx={{width: "100%" }}>
        <Outlet />
    </Box>
  );
}
