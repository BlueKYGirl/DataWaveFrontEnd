import React from "react";
import "../styles/planDetails.css"; // Import CSS file for styling

export const PlanDetails = ({ plan }) => {
    return (
        <div className="plan-details">
            <h2>{plan.planName}</h2>
            <p>Device Limit: {plan.deviceLimit}</p>
            <p>Price: ${plan.price}</p>
        </div>
    );
};

