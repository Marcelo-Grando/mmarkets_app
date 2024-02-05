import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function TestTabs(props) {
  const {paths} = props

  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path)
  };

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
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider", width: 1 / 5 }}
        >
          {
            paths.map((elem, index) => (<Tab onClick={() => handleClick(`${elem.path}`)} label={`${elem.label}`} />))
          }
        </Tabs>
        <Outlet />
      </Box>
  );
}
