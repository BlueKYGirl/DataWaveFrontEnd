import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/userService";

const Registration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await registerUser({ firstName, lastName, email, password });
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      // Display error message to the user
    }
  };

  return (
    <div className="loginContainer">
      <Link to="/">
        <img id="loginLogo" src="./logo_trans.png" alt="DataWave logo" />
      </Link>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div id="firstName">
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div id="lastName">
          <label htmlFor="lastName">Last Name: </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
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
      <p className="loginMessage">
        Already have an account? <Link id='logLink' to="/login">Login here</Link>.
      </p>
    </div>
  );
};

export default Registration;
