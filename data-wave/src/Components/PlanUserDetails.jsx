import React, { useState, useEffect } from 'react';
import { getPlanById } from '../services/planService';
import { getAllDevicesByPlanUserId } from '../services/deviceService';
import AddDevice from './AddDevice';
import RemoveDevice from './RemoveDevice';
import CancelPlanComponent from '../Components/CancelPlan';

const PlanUserDetails = ({ planUser, updatePlanUserList }) => {
  const [plan, setPlan] = useState(null);
  const [deviceCount, setDeviceCount] = useState(0);
  const [deviceLimit, setDeviceLimit] = useState(0);

  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        const fetchedPlan = await getPlanById(planUser.planId);
        setPlan(fetchedPlan);
        setDeviceLimit(fetchedPlan.deviceLimit);
      } catch (error) {
        console.error('Error fetching plan:', error.message);
      }
    };

    const fetchDeviceCount = async () => {
      try {
        const devices = await getAllDevicesByPlanUserId(planUser.id);
        setDeviceCount(devices.length);
      } catch (error) {
        console.error('Error fetching devices:', error.message);
      }
    };

    fetchPlanDetails();
    fetchDeviceCount();
  }, [planUser]);

  // Callback function to update device count
  const updateDeviceList = async () => {
    try {
      const devices = await getAllDevicesByPlanUserId(planUser.id);
      setDeviceCount(devices.length);
    } catch (error) {
      console.error('Error updating device count:', error.message);
    }
  };

  return (
    <div>
      <h3>Plan User Details</h3>
      <p>Plan User ID: {planUser.id}</p>
      {plan && (
        <>
          <p>Plan Name: {plan.planName}</p>
          <p>Price: ${plan.price}</p>
          <p>Device Count: {deviceCount}/{deviceLimit}</p>
        </>
      )}
      {/* Pass the updateDeviceList callback function as a prop */}
      <AddDevice planUser={planUser} updatePlanUserList={updatePlanUserList} updateDeviceList={updateDeviceList} />
      {/* Pass the updateDeviceList callback function as a prop */}
      {deviceCount > 0 && <RemoveDevice planUser={planUser} updatePlanUserList={updatePlanUserList} updateDeviceList={updateDeviceList} />}
      <CancelPlanComponent planUserGuid={planUser.id} updatePlanUserList={updatePlanUserList} deviceCount={deviceCount}/>
    </div>
  );
};

export default PlanUserDetails;