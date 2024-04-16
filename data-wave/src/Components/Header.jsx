import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../pages/context/UserContext'; // Import the UserContext
import '../styles/header.css';

export const Header = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { userGuid, updateUserGuid } = useContext(UserContext); // Get userGuid from UserContext

  // Function to handle sign out
  const handleSignOut = () => {
    // Clear userGuid
    updateUserGuid(null); 
    // Redirect to home page
    navigate('/');
  };

  const handleSubmit = () => {
    navigate('/login'); 
  };

  return (
    <div>
      <header>
        <img alt="DataWave logo" src="../../full_logo_trans.png" />
        <nav>
          {userGuid && (
            <>
              <div className='accountMenu'>
                <h2>Account</h2>
              </div>
              <div className='deviceMenu'>
                <h2>Devices</h2>
              </div>
            </>
          )}
          <div className='login'>
            {userGuid ? (
              <h2 onClick={handleSignOut} className="link">Sign Out</h2>
            ) : (
              <h2 onClick={handleSubmit} className="link">Sign In</h2>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};
