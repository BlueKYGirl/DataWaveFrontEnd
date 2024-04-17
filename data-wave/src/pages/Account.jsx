import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../pages/context/UserContext'; // Import the UserContext
import { fetchUserDetails } from '../functions/getUser'; // Import the fetchUserDetails function
import { Header } from '../Components/Header';
import { Footer } from '../Components/Footer';
import AddPlanComponent from '../Components/AddPlanComponent';
import PlanUsersById from '../Components/PlanUsersById';
import { getAllPlanUsers } from '../services/planUserService'; // Import the getAllPlanUsers function
import UserBill from '../Components/UserBill';

const Account = () => {
  const { userGuid } = useContext(UserContext);
  const [user, setUser] = useState(null); // State to store user details

  useEffect(() => {
    fetchUserDetails(userGuid, setUser);
  }, [userGuid]);

  // Function to update plan user list
  const updatePlanUserList = () => {
    // Implement your logic to update the plan user list here
    // For now, just log a message
    console.log("Updating plan user list...");
    // Fetch plan users after updating
    fetchPlanUsersByUserId();
  };

  // Fetch plan users by user ID
  const fetchPlanUsersByUserId = async () => {
    try {
      const planUsersData = await getAllPlanUsers();
      // Filter plan users by user ID
      const filteredPlanUsers = planUsersData.filter((planUser) => planUser.userId === userGuid);
      // Set plan users
      setPlanUsers(filteredPlanUsers);
    } catch (error) {
      console.error("Error fetching plan users:", error.message);
    }
  };

  // State for plan users
  const [planUsers, setPlanUsers] = useState([]);

  return (
    <>
      <Header />
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
      <UserBill userId={userGuid}/>
      {/* Pass updatePlanUserList to AddPlanComponent */}
      <AddPlanComponent updatePlanUserList={updatePlanUserList} />
      {/* Pass updatePlanUserList to PlanUsersById */}
      <PlanUsersById userId={userGuid} updatePlanUserList={updatePlanUserList} />
      <Footer />
    </>
  );
};

export default Account;
