import React, { useState, useContext } from "react";
import UserContext from "./context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { authenticateUser } from "../services/userService";

import "../styles.css";

const Login = () => {
  const { updateUserGuid } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await authenticateUser(email, password);
      const { userId } = response;
      updateUserGuid(userId);
      navigate("/");
    } catch (error) {
      if (error.message === "Authentication failed") {
        setError("Authentication failed. Please check your credentials.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="loginContainer">
      <Link to="/">
        <img id="loginLogo" src="./logo_trans.png" alt="DataWave logo" />
      </Link>
      <h2>Log In</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
        <p>
          No account? No problem.{" "}
          <Link id="regLink" to="/register">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
