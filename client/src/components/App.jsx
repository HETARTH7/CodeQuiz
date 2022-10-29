import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const registerUser = (e) => {
    const user = { name, email, password };
    axios
      .post("http://localhost:5000/register", user)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          name={name}
        ></input>
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

export default App;
