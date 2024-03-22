import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import { useQueryData } from "../hooks/useQueryData";

import Logo from "/Logo2.png";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AssessmentIcon from "@mui/icons-material/Assessment";
import GroupsIcon from "@mui/icons-material/Groups";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import StorageIcon from "@mui/icons-material/Storage";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import LabelIcon from "@mui/icons-material/Label";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(0.5),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function DrawerPrueba() {
  const { userData, loading, pages } = useQueryData();

  const navigate = useNavigate();

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState(false);


  const expandItems = (name) => {
    const value = openSub[name];
    setOpenSub({ ...openSub, [name]: !value });
  };

  const navigateTo = (childrenPath, path) => {
    console.log("path", path)
    console.log("child", childrenPath)
    if (childrenPath === "default") {
      navigate(path);
      return;
    }
    navigate(`${path}/${childrenPath}`);
  };

  const listSubItems = () => {
    const pagesWithPaths = pages?.filter((page, index) => page.paths);
    const stateKeys = pagesWithPaths.map((e) => {
      return { [e.name]: false };
    });
    const state = Object.assign({}, ...stateKeys);
    setOpenSub(state);
  };

  useEffect(() => {
    listSubItems();
  }, [pages]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar className="app-bar" style={{ minHeight: "50px" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <img
            onClick={() => navigate("/")}
            className="logo-app"
            src={Logo}
            alt="Logo"
          />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader style={{ minHeight: "50px" }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {pages.map((row, index) => {
            if (row.paths) {
              return (
                <List>
                  <ListItemButton onClick={() => expandItems(row.name)}>
                    <ListItemIcon>
                      {index === 1 && <GroupsIcon />}
                      {index === 3 && <StorageIcon />}
                    </ListItemIcon>
                    <ListItemText primary={row.name} />
                    {openSub[row.name] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openSub[row.name]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {row.paths.map((path) => (
                        <ListItemButton
                          sx={{ pl: 4 }}
                          onClick={() => navigateTo(path.path, row.name)}
                        >
                          <ListItemIcon>
                            <LabelIcon />
                          </ListItemIcon>
                          <ListItemText primary={path.label} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </List>
              );
            }
            return (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => navigate(row.name)}>
                  <ListItemIcon>
                    {index === 0 && <AssessmentIcon />}
                    {index === 2 && <LibraryBooksIcon />}
                  </ListItemIcon>
                  <ListItemText primary={row.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
