import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, TextField, Button } from "@mui/material";
import Typography from "@mui/material/Typography";

import Form from "../components/Form";

import { login } from "../api/Auth";
import { getUserRoles } from "../api/Users";

const inpustData = [ {
  name: "email",
  type: "email",
  label: "Email",
},
{
  name: "password",
  type: "password",
  label: "Password",
}]

const initialState = {
  email: "",
  password: ""
};

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

  const sendUser = async (user) => {

    const response = await login(user);

    const { data } = await getUserRoles();

    navigate("/user", { state: { userData: data } });
  };

  return (
      <Form title={"Signin"} inpustData={inpustData} btn_title={"Signin"} functionSubmit={sendUser} initialState={initialState}/>
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
