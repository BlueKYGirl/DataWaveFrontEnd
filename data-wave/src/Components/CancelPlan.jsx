import React, { useState } from 'react';
import { deletePlanUser } from '../services/planUserService';
import '../styles/cancelPlan.css';

const CancelPlanComponent = ({ planUserGuid, updatePlanUserList, deviceCount }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const confirmCancelPlanUser = async () => {
    if (deviceCount > 0) {
        alert("All devices must be removed from the account before cancellation.");
        return;
      }
      
    try {
      await deletePlanUser(planUserGuid);
      alert('Plan canceled successfully!');
      updatePlanUserList();
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error canceling plan:", error.message);
    }
  };

  const cancelSelection = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="cancel-plan">
      <button onClick={() => setShowConfirmation(true)} className="cancel-plan-button">Cancel Plan</button>
      {/* Confirmation dialog */}
      {showConfirmation && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to cancel this plan?</p>
          <div>
            <button onClick={confirmCancelPlanUser} className="confirm-button">Confirm</button>
            <button onClick={cancelSelection} className="cancel-button">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CancelPlanComponent;
