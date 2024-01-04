
export default function AdminHomePage(props) {

    console.log(props)
  return (
    <div>
        <nav className="container-fluid border border-dark text-center">
          <div className="row">
            <div className="col btn-gr">
              <NavLink className="nav-link">manage administrators</NavLink>
            </div>
            <div className="col btn-gr">
              <NavLink className="nav-link">administrator reports</NavLink>
            </div>
          </div>
    </nav>
    </div>
  )
}
