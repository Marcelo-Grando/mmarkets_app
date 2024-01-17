import { NavLink, Link } from "react-router-dom";

export default function AdminHomePage({userData}) {
  return (
    <nav className="nav-admin">
      <NavLink>Reports</NavLink>
      <NavLink>tickets</NavLink>
      <NavLink>products</NavLink>
      <NavLink>categorias</NavLink>
      <Link to={"/reports"} state={{ userData: userData }}>config</Link>
    </nav>
  );
}
