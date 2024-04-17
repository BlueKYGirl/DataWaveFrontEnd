import React, { useState, useEffect } from 'react';
import { getAllDevicesByPlanUserId, updateDevice } from '../services/deviceService';
import { formatPhoneNumber } from '../functions/phoneNumber.js';

const RemoveDevice = ({ planUser, updateDeviceList, updatePlanUserList }) => {
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const planUserDevices = await getAllDevicesByPlanUserId(planUser.id);
        setDevices(planUserDevices);
      } catch (error) {
        console.error('Error fetching devices:', error.message);
      }
    };

    fetchDevices();
  }, [planUser, updateDeviceList]);

  const handleDeviceSelect = (deviceId) => {
    setSelectedDeviceId(deviceId);
  };

  const handleRemoveDevice = async () => {
    if (!selectedDeviceId) {
      alert('Please select a device to remove');
      return;
    }

    try {
      // Update the device to remove the planUserId
      await updateDevice(selectedDeviceId, { planUserId: null });
      alert('Device removed successfully');

      // Call the updateDeviceList function passed from the parent component
      updateDeviceList();
      updatePlanUserList();
      setSelectedDeviceId(''); // Reset the selected device
    } catch (error) {
      console.error('Error removing device:', error.message);
      alert('Failed to remove device');
    }
  };

  return (
    <div>
      <h3>Remove Device</h3>
      <select value={selectedDeviceId} onChange={(e) => handleDeviceSelect(e.target.value)}>
        <option value="">Select a device</option>
        {devices.map(device => (
          <option key={device.id} value={device.id}>{`Phone Number - ${formatPhoneNumber(device.phoneNumber)}`}</option>
        ))}
      </select>
      <button onClick={handleRemoveDevice}>Remove Device</button>
    </div>
  );
};

export default RemoveDevice;