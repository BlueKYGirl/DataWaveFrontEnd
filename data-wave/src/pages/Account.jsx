import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../pages/context/UserContext'; // Import the UserContext
import { fetchUserDetails } from '../functions/getUser'; // Import the fetchUserDetails function
import {Header} from '../Components/Header';
import {Footer} from '../Components/Footer';
import AddPlanComponent from '../Components/AddPlanComponent';


const Account = () => {
  const { userGuid } = useContext(UserContext);
  const [user, setUser] = useState(null); // State to store user details

  useEffect(() => {
    fetchUserDetails(userGuid, setUser);
  }, [userGuid]);

  return (
    <>
    <Header></Header>
    <div>
      <h1>Account Details</h1>
      {user && (
        <div>
          <p>Name: {user.fullName}</p>
          <p>Email: {user.email}</p>
          {/* Add more user details here */}
        </div>
      )}
    </div>
    <AddPlanComponent />
    <Footer></Footer>
    </>
    
  );
};

export default Account;
