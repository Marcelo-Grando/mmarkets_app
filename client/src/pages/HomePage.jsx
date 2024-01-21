import { getProfile } from "../api/Profiles.js";
import { ButtonAppBar } from "../components/ButtonAppBar.jsx"
import { useNavigate, Outlet } from "react-router-dom";

export default function HomePage() {
  const profile = async () => {
    const p = await getProfile("b443cs2a0x");
    console.log(p.data);
  };

  const inputsData = [{
    type: "email",
    name: "email",
    label: "Email"
  }, {
    type: "password",
    name: "password",
    label: "Password"
  }]

  return (
    <div>
      <ButtonAppBar/>
      <Outlet/>
    </div>
  );
}
