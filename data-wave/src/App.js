import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from './pages/context/UserContext';
import { Home } from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Account from './pages/Account';
import Devices from './pages/Devices';

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          {/* Render Login without Layout */}
          <Route path="/login" element={<Login />} />

          {/* Render Registration without Layout */}
          <Route path="/registration" element={<Registration />} />

          {/* Render other routes with Layout */}
          <Route path= "/" element = {<Home />} />

          <Route path="/account" element={<Account />} />

          <Route path="/devices" element={<Devices />} />

        </Routes>
      </UserProvider>
      
    </Router>
  );
}

export default App;
