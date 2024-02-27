import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
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
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{width: "19%", borderColor: "text.disabled" }}>
        <List sx={{width: "100%", minWidth:'19%', borderRight: 1}}>
          {paths.map((path, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                selected={selectedIndex === index}
                onClick={() => handleClick(`${path.path}`, index)}
              >
                <ListItemText primary={`${path.label}`} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ width: "80%", paddingInline: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
