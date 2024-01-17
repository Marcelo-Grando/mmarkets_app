import { createMainAccount } from "../api/Accounts"

export default function RegisterPage() {
  return (
    <div>
        <div className="nav">
        <nav>
          <h2>Mmarket'S</h2>
          <div className="buttons">
            <button>registrarse</button>
            <button onClick={() => navigate("/signin")}>iniciar sesion</button>
          </div>
        </nav>
      </div>
      <div className="container">
        <form className="form">
          <h2>Login</h2>
          <input
            type="text"
            name="name"
            placeholder="name"
          />
          <input
            type="text"
            name="adress"
            placeholder="adress"
          />
          <input
            type="email"
            name="email"
            placeholder="email"
          />
          <input
            type="password"
            name="password"
            placeholder="password"
          />
          <button>Register</button>
        </form>
        </div>
    </div>
  )
}
