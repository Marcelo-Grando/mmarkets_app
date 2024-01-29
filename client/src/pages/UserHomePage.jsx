import { useLocation, Outlet } from "react-router-dom";

import ResponsiveAppBar from "../components/ResponsiveAppBar";

import { useQueryData } from "../hooks/useQueryData";

const settings = [
  { name: "Profile", path: "/profile" },
  { name: "Account", path: "/account" },
  { name: "Dashboard", path: "/dashboard" },
];

export default function UserHomePage() {
  const {userData, loading, pages} = useQueryData();

  return (
    <div>
      {loading && (<h3>loading...</h3>)}
      {userData && (
        <>
          <ResponsiveAppBar pages={pages} settings={settings} />
          <Outlet />
        </>
      )}
    </div>
  );
}
