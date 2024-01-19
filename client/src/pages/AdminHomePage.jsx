import { NavLink, Link } from "react-router-dom";

export default function AdminHomePage() {
  return (
    <nav className="nav-admin">
      <NavLink to={"/reports"}>Reports</NavLink>
      <NavLink>tickets</NavLink>
      <NavLink>products</NavLink>
      <NavLink>categorias</NavLink>
    </nav>
  );
}
