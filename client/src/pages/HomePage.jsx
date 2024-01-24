import { ButtonAppBar } from "../components/ButtonAppBar.jsx"
import { Outlet } from "react-router-dom";

export default function HomePage() {

  return (
    <div>
      <ButtonAppBar/>
      <Outlet/>
    </div>
  );
}
