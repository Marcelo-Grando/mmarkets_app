import { NavLink } from "react-router-dom";

export default function SellerHomePage({ userData }) {
  console.log(userData);
  return (
    <div>
      <div className="dropdown">
        <button className="btn-des">=</button>
        <div className="drop-content">
          <NavLink className="nav-link">sell</NavLink>
          <NavLink className="nav-link">sales</NavLink>
          <NavLink className="nav-link">categories</NavLink>
          <NavLink className="nav-link">products</NavLink>
        </div>
      </div>
      <h3>Mmarkets'S</h3>
    </div>
  );
}
