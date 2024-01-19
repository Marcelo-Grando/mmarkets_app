import { getProfile } from "../api/Profiles.js";
import { ButtonAppBar } from "../components/ButtonAppBar.jsx"
import { useNavigate } from "react-router-dom";
import Form  from "../components/Form.jsx";

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

  const navigate = useNavigate()

  return (
    <div>
      <ButtonAppBar/>
      <Form title={"Titulo"}  inpustData={inputsData} btn_title={"CLICK"}/>
    </div>
  );
}
