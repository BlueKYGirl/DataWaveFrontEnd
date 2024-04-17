import React, { useState, useEffect } from 'react';
import { getUserBill } from '../services/userService';

const UserBill = ({ userId }) => {
  const [userBill, setUserBill] = useState(null);
  const [showBill, setShowBill] = useState(false);

  useEffect(() => {
    const fetchUserBill = async () => {
      try {
        const billData = await getUserBill(userId);
        setUserBill(billData);
      } catch (error) {
        console.error("Error fetching user bill:", error.message);
      }
    };
    fetchUserBill();
  }, [userId]);

  const toggleShowBill = () => {
    setShowBill(!showBill);
  };

  return (
    <div>
      <button onClick={toggleShowBill}>{showBill ? 'Hide Bill' : 'Show Bill'}</button>
      {showBill && userBill && (
        <div>
          <h2>User Bill Details</h2>
          <p>User ID: {userId}</p>
          <p>Bill Amount: ${userBill.totalCost}</p>
          {/* Add more bill details here */}
        </div>
      )}
    </div>
  );
};

export default UserBill;
