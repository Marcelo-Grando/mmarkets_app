import { useLocation } from "react-router-dom";

import SellerHomePage from "./SellerHomePage";
import MainHomePage from "./MainHomePage";
import AdminHomePage from "./AdminHomePage";

import { getPagesInfo } from "../api/Pages";
import { useEffect, useState } from "react";

export default function UserHomePage() {
  const { state } = useLocation();
  const [pages, setPages] = useState([]);

  const { roles } = state.userData;

  const loadPages = async () => {
    const response = await getPagesInfo(roles);
    setPages(response.data);
  };

  useEffect(() => {
    loadPages();
  }, []);

  return <SellerHomePage pages={pages} />;
}
