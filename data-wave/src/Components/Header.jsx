import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../pages/context/UserContext'; // Import the UserContext
import '../styles/header.css';

export const Header = () => {
  const { userGuid, updateUserGuid } = useContext(UserContext); // Get userGuid from UserContext

  // Function to handle sign out
  const handleSignOut = () => {
    // Implement your sign out logic here
    updateUserGuid(null); // Clear userGuid
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
              <h2><Link to="/login" className="link">Sign In</Link></h2>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};
