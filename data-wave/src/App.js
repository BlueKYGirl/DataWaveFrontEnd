import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';

function App() {
  return (
    <Router>
      <Routes>
        {/* Render Login without Layout */}
        <Route path="/login" element={<Login />} />

        {/* Render Registration without Layout */}
        <Route path="/registration" element={<Registration />} />

        {/* Render other routes with Layout */}
        <Route path= "/" element = {<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
