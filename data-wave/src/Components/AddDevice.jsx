// AddDevice.js

import React, { useState, useEffect } from 'react';
import { getAllDevicesByUserId, updateDevice } from '../services/deviceService';
import { formatPhoneNumber } from '../functions/phoneNumber.js';

const AddDevice = ({ planUser, updateDeviceList, updatePlanUserList }) => {
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const userDevices = await getAllDevicesByUserId(planUser.userId);
        // Filter devices that are not associated with any planUser
        const unassignedDevices = userDevices.filter(device => !device.planUserId);
        setDevices(unassignedDevices);
      } catch (error) {
        console.error('Error fetching devices:', error.message);
      }
    };

    fetchDevices();
  }, [planUser, updateDeviceList]);

  const handleDeviceSelect = (deviceId) => {
    setSelectedDeviceId(deviceId);
  };

  const handleAddDevice = async () => {
    if (!selectedDeviceId) {
      alert('Please select a device to add');
      return;
    }

    try {
      // Update the device with the planUserId
      await updateDevice(selectedDeviceId, { planUserId: planUser.id });
      alert('Device added successfully');

      // Call the updateDeviceList function passed from the parent component
      updateDeviceList();
      updatePlanUserList();
      setSelectedDeviceId(''); // Reset the selected device
    } catch (error) {
      console.error('Error adding device:', error.message);
      alert('Failed to add device');
    }
  };

  return (
    <div className='add-device'>
      <h3>Add a Device</h3>
      <select value={selectedDeviceId} onChange={(e) => handleDeviceSelect(e.target.value)}>
        <option value="">Select a device</option>
        {devices.map(device => (
          <option key={device.id} value={device.id}>{`Phone Number - ${formatPhoneNumber(device.phoneNumber)}`}</option>
        ))}
      </select>
      <button id='addDevice' onClick={handleAddDevice}>Add Device</button>
    </div>
  );
};

export default AddDevice;