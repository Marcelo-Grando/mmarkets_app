import { Link } from "react-router-dom";
import { FaList } from "react-icons/fa6";


export default function SellerHomePage() {

  return (
    <section>
      <div className="nav-bar">
        <div className="dropdown">
          <FaList className="btn-des"></FaList>
          <div className="drop-content">
            <Link
              to="/sale"
              className="nav-link"
            >
              sell
            </Link>
            <Link className="nav-link">sales</Link>
            <Link className="nav-link">categories</Link>
            <Link className="nav-link">products</Link>
          </div>
        </div>
        <div className="logo-container">
          <h2 className="logo">Mmarkets'S</h2>
        </div>
      </div>
    </section>
  );
}
