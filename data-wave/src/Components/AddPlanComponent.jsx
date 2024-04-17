import React, { useState, useEffect, useContext } from 'react';
import { getAllPlans } from '../services/planService';
import { createPlanUser } from '../services/planUserService';
import UserContext from '../pages/context/UserContext'; // Adjust the path as needed

const AddPlanComponent = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [plans, setPlans] = useState([]);
  const { userGuid } = useContext(UserContext);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const plansData = await getAllPlans();
        setPlans(plansData);
      } catch (error) {
        console.error("Error fetching plans:", error.message);
        // You can handle the error here, such as displaying a message to the user
      }
    };
    fetchPlans();
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const addPlanUser = async (plan) => {
    try {
      const newPlanUser = { userId: userGuid, planId: plan.id }; // Using userId from context
      const createdPlanUser = await createPlanUser(newPlanUser);
      console.log('PlanUser created:', createdPlanUser);
      // Optionally, you can perform additional actions after creating the planUser
    } catch (error) {
      console.error("Error creating PlanUser:", error.message);
      // You can handle the error here, such as displaying a message to the user
    }
  };

  return (
    <div className="add-plan">
      <button onClick={toggleDropdown} className="add-plan-button">Add Plan</button>
      {showDropdown && (
        <div className="dropdown">
          <ul>
            {plans.map((plan) => (
              <li key={plan.id} onClick={() => addPlanUser(plan)}>
                {plan.planName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddPlanComponent;
