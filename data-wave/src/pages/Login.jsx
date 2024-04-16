import React, { useState, useContext } from "react";
import UserContext from "./context/UserContext";
import { useNavigate } from "react-router-dom"; // Import useHistory hook


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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
