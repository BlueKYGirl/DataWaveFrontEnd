import React, { useState, useEffect } from 'react';
import { getUserBill } from '../services/userService';

let date = new Date().toLocaleDateString();

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
    <div className='billInfo'>
      <button id="bill" onClick={toggleShowBill}>{showBill ? 'Hide My Bill' : 'See My Bill'}</button>
      {showBill && userBill && (
        <div className='billDetails'>
          <h2>Invoice</h2>
          <p>Customer ID: {userId}</p>
          <p>Monthly Total: ${userBill.totalCost}</p>
          <p>Invoice Date: {date}</p>
          {/* Add more bill details here */}
        </div>
      )}
    </div>
  );
};

export default UserBill;
