import ResponsiveAppBar from "../components/ResponsiveAppBar";

const pages = [
  {
    name: "reports",
    path: "/reports",
  },
  {
    name: "products",
    path: "/products",
  },
  {
    name: "categories",
    path: "/categories",
  },
  {
    name: "accounts",
    path: "/accounts",
  },
  {
    name: "sales",
    path: "/sales",
  }
];

const settings = [
  { name: "Profile", path: "/profile" },
  { name: "Account", path: "/account" },
  { name: "Dashboard", path: "/dashboard" }
];

export default function AdminHomePage() {

  return (
    <>
    <ResponsiveAppBar pages={pages} settings={settings}/>
    </>
  );
}
