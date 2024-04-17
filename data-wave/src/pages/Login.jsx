import React, { useState, useContext } from "react";
import UserContext from "./context/UserContext";
import { useNavigate, Link } from "react-router-dom"; // Import useHistory hook

import "../styles.css";


const Login = () => {
  const { updateUserGuid } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook


  const handleSubmit = (e) => {
    e.preventDefault();

    // temporary method to set user guid for testing
    const userGuid = "06917677-cdd6-4523-91b8-88d6d0a912d2"
    updateUserGuid(userGuid);
    navigate("/"); // Redirect to home page after login (temporary method to set user guid for testing
    // Perform login logic here, e.g., send login request to backend
    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="loginContainer">
      <img id="loginLogo" src="./logo_trans.png" alt="DataWave logo" />
      <h2>Login</h2>
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
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div id="submitLogin">
        <button type="submit">Login</button>
        </div>
       <p>No account? No problem. <Link to="/register" >Register here </Link></p>
      </form>
    </div>
  );
};

export default Login;
