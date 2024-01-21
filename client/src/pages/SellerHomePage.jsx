import ResponsiveAppBar from "../components/ResponsiveAppBar";

const settings = [
  { name: "Profile", path: "/profile" },
  { name: "Account", path: "/account" },
  { name: "Dashboard", path: "/dashboard" }
];

export default function SellerHomePage(props) {
  return (
    <>
      <ResponsiveAppBar pages={props.pages} settings={settings} />
    </>
  );
}
