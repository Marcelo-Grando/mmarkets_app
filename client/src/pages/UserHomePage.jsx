import { useLocation, Outlet } from "react-router-dom";

import ResponsiveAppBar from "../components/ResponsiveAppBar";

import SellerHomePage from "./SellerHomePage";
import MainHomePage from "./MainHomePage";
import AdminHomePage from "./AdminHomePage";

import { getPagesInfo } from "../api/Pages";
import { useEffect, useState } from "react";

const settings = [
  { name: "Profile", path: "/profile" },
  { name: "Account", path: "/account" },
  { name: "Dashboard", path: "/dashboard" },
];

export default function UserHomePage() {
  const { state } = useLocation();
  const [pages, setPages] = useState([]);
  const [roles, setRoles] = useState()

  const loadPages = async () => {
    if (!roles) {
    const response = await getPagesInfo(state.userData.roles);
    setPages(response.data);
    setRoles(state.userData.roles)
    return
    }
    const response = await getPagesInfo(roles);
    setPages(response.data);
  };

  useEffect(() => {
    loadPages();
  }, []);

  return (
    <>
      <ResponsiveAppBar pages={pages} settings={settings} />
      <Outlet />
    </>
  );
}
