import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform registration logic here, e.g., send registration request to backend
    console.log("Registering with:", { email, password });
  };

  return (
    <div className="loginContainer">
      <img id="loginLogo" src="./logo_trans.png" alt="DataWave logo" />
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div id="email">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div id="password">
          <label htmlFor="password">Password: </label>  
          &nbsp;
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div id="submitLogin">
        <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
