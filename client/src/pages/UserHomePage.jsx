import DrawerPrueba from "../components/DrawerPrueba";

import { useQueryData } from "../hooks/useQueryData";

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
      {userData && <DrawerPrueba />}
    </div>
  );
}
