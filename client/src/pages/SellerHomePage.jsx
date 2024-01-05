import { Link } from "react-router-dom";

export default function SellerHomePage({ userData }) {

  return (
    <div>
      <div className="dropdown">
        <button className="btn-des">=</button>
        <div className="drop-content">
          <Link to="/sale" state={{userData: userData}} className="nav-link">sell</Link>
          <Link className="nav-link">sales</Link>
          <Link className="nav-link">categories</Link>
          <Link className="nav-link">products</Link>
        </div>
      </div>
      <h3>Mmarkets'S</h3>
    </div>
  );
}
