import React, { useState, useEffect } from 'react';
import { getAllPlanUsers } from '../services/planUserService'; // Import the getAllPlanUsers function
import PlanUserDetails from './PlanUserDetails';

const PlanUsersById = ({ userId, updatePlanUserList }) => {
  const [planUsers, setPlanUsers] = useState([]);

  useEffect(() => {
    // Fetch plan users by user ID
    const fetchPlanUsersByUserId = async () => {
      try {
        const planUsersData = await getAllPlanUsers();
        // Filter plan users by user ID
        const filteredPlanUsers = planUsersData.filter((planUser) => planUser.userId === userId);
        setPlanUsers(filteredPlanUsers);
      } catch (error) {
        console.error("Error fetching plan users:", error.message);
      }
    };

    fetchPlanUsersByUserId();
  }, [userId, updatePlanUserList]); // Add updatePlanUserList as a dependency

  return (
    <div>
      <h2 id='myPlansHeader'>My Plans</h2>
      <ul className='bulletList'>
        {planUsers.map((planUser) => (
          <li key={planUser.id}>
            {/* Pass the updatePlanUserList function as a prop */}
            <PlanUserDetails planUser={planUser} updatePlanUserList={updatePlanUserList} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanUsersById;
