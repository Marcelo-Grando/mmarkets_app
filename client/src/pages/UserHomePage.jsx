import { useLocation, Outlet } from "react-router-dom";

import ResponsiveAppBar from "../components/ResponsiveAppBar";
import {BasicAppBar}  from "../components/BasicAppBar";
import PermanentDrawerLeft from "../components/PermanentDrawerLeft";
import PersistentDrawerLeft from "../components/PersistentDrawerLeft"
import DrawerPrueba from "../components/DrawerPrueba";

import { useQueryData } from "../hooks/useQueryData";

import { Box } from "@mui/material";

const settings = [
  { name: "Profile", path: "/profile" },
  { name: "Account", path: "/account" },
  { name: "Dashboard", path: "/dashboard" },
];

export default function UserHomePage() {
  const { userData, loading, pages } = useQueryData();

  return (
    <div>
      {loading && <h3>loading...</h3>}
      {userData && (
        <>
          {/* <BasicAppBar pages={pages}/>
          <Outlet /> */}
          {/* <PersistentDrawerLeft/> */}
          <DrawerPrueba/>
        </>
      )}
    </div>
  );
}
