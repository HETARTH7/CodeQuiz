import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = (e) => {
    const user = { email, password };
    axios
      .post("http://localhost:5000/login", user)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          name={email}
        ></input>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          name={password}
        ></input>
        <input type="submit"></input>
      </form>
    </div>
  );
};

export default Login;
