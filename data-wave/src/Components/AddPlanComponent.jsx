import React, { useState, useEffect, useContext } from 'react';
import { getAllPlans } from '../services/planService';
import { createPlanUser } from '../services/planUserService';
import UserContext from '../pages/context/UserContext'; // Adjust the path as needed
import '../styles/addPlan.css'

const AddPlanComponent = ({updatePlanUserList}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
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
    console.log("dropdown toggled")
    console.log(showDropdown)
    console.log(plans)
    setShowDropdown(!showDropdown);
  };

  const selectPlan = (plan) => {
    setSelectedPlan(plan);
    toggleDropdown(); // Close the dropdown after selecting a plan
  };

  const confirmAddPlanUser = async () => {
    if (selectedPlan) {
      try {
        const newPlanUser = { userId: userGuid, planId: selectedPlan.id }; // Using userId from context
        const createdPlanUser = await createPlanUser(newPlanUser);
        console.log('PlanUser created:', createdPlanUser);
        // Optionally, you can perform additional actions after creating the planUser
        alert('Plan created successfully!');
        setSelectedPlan(null); // Reset selectedPlan state
        updatePlanUserList();
      } catch (error) {
        console.error("Error creating PlanUser:", error.message);
        // You can handle the error here, such as displaying a message to the user
      }
    }
  };

  const cancelSelection = () => {
    setSelectedPlan(null);
  };

  return (
    <div className="add-plan">
      <button onClick={toggleDropdown} className="add-plan-button">Add Plan</button>
      {showDropdown && (
        <div className="dropdown">
          <select value={selectedPlan ? selectedPlan.id : ''} onChange={(e) => selectPlan(plans.find(plan => plan.id === e.target.value))}>
            <option value="">Select a plan</option>
            {plans.map((plan) => (
              <option key={plan.id} value={plan.id}>{plan.planName}</option>
            ))}
          </select>
        </div>
      )}
      {/* Confirmation dialog */}
      {selectedPlan && (
        <div className="confirmation-dialog">
          <p>Selected Plan: {selectedPlan.planName}</p>
          <div>
            <button onClick={confirmAddPlanUser} className="confirm-button">Confirm</button>
            <button onClick={cancelSelection} className="cancel-button">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPlanComponent;
