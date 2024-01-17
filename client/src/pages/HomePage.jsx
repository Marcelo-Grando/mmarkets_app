import { getProfile } from "../api/Profiles.js";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const profile = async () => {
    const p = await getProfile("b443cs2a0x");
    console.log(p.data);
  };

  const navigate = useNavigate()

  return (
    <div className="nav">
      <nav>
        <h3>Mmarket'S</h3>
        <div className="buttons">
          <button onClick={() => navigate("/register")}>registrarse</button>
          <button onClick={() => navigate("/signin")}>iniciar sesion</button>
        </div>
      </nav>
    </div>
  );
}
