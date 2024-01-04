
export default function MainHomePage(props) {

    console.log(props)

  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiaty px-2 mx-2 py-0">
        <h3 className="logo" onClick={()=> navigate('/market')}>{account.market}</h3>
        <div className="container-fluid mx-5">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" to={`sellers`}>sellers</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={`reports`}>reports</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={`products`}>products</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={`categories`}>categories</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={`administrators`}>administrators</NavLink>
          </li>
        </ul>
        <button onClick={closeSession} type="button" className="btn btn-primary btn-sm">Logout</button>
        </div>
      </nav>
    </div>
  )
}
