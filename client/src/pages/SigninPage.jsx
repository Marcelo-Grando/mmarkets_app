import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, TextField, Button } from "@mui/material";
import Typography from "@mui/material/Typography";

import { login } from "../api/Auth";
import { getUserRoles } from "../api/Users";

export default function SigninPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInputsChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const sendUser = async (e) => {
    e.preventDefault();

    const response = await login(user);

    const { data } = await getUserRoles();

    navigate("/user", { state: { userData: data } });
  };

  return (
    <div className="form-container">
      <Typography className="h6" variant="h6">
        LOGIN
      </Typography>
      <Box component="form" onSubmit={sendUser}>
        <TextField
          size="small"
          className="text-field"
          id="email"
          type="email"
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
          onChange={handleInputsChange}
          placeholder="email"
        />
        <TextField
          size="small"
          className="text-field"
          type="password"
          name="password"
          label="Password"
          variant="outlined"
          fullWidth
          onChange={handleInputsChange}
          placeholder="password"
        />
        <Button
          className="btn-form"
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </Box>
    </div>
  );

  // return (
  //   <>
  //     <div className="nav">
  //       <nav>
  //         <h2>Mmarket'S</h2>
  //         <div className="buttons">
  //           <button>registrarse</button>
  //           <button onClick={() => navigate("/signin")}>iniciar sesion</button>
  //         </div>
  //       </nav>
  //     </div>
  //     <div className="container">
  //       <form className="form" onSubmit={sendUser}>
  //         <h2>Login</h2>
  //         <input
  //           type="email"
  //           name="email"
  //           onChange={handleInputsChange}
  //           placeholder="email"
  //         />
  //         <input
  //           type="password"
  //           name="password"
  //           onChange={handleInputsChange}
  //           placeholder="password"
  //         />
  //         <a href="/register">Unregistered? Sign up here</a>
  //         <button>login</button>
  //       </form>
  //       <div className="text">
  //         <h4>Mmarket'S App</h4>
  //         <p>
  //           Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
  //           sed, iusto, cumque perspiciatis molestiae nulla aut facilis, magnam
  //           animi voluptatibus autem saepe similique veniam blanditiis doloribus
  //           consequatur quae in at!
  //         </p>
  //         <p>
  //           Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere odio
  //           consequatur optio rerum explicabo nostrum praesentium sunt
  //           laudantium. Voluptas totam saepe voluptates nisi fugiat veritatis.
  //           Ipsum qui corporis omnis est?
  //         </p>
  //       </div>
  //     </div>
  //   </>
  // );
}
