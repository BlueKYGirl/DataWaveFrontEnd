
import React, { useState } from 'react';
import { createDevice, getAllDevicesByPhoneNumber } from '../services/deviceService';

const AddDeviceButton = ({ userId, updateDevices }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddDevice = async () => {
    try {
      // Validate phone number format
      if (!isValidPhoneNumber(phoneNumber)) {
        setError('Please enter a valid 10-digit phone number.');
        return;
      }

      // Check if the phone number is already in the database
      const isUnique = await checkUniquePhoneNumber(phoneNumber);
      if (!isUnique) {
        setError('Phone number already exists in the database.');
        return;
      }

      // Create a new device for the user
      await createDevice(userId, { phoneNumber });
      // Update the list of devices
      updateDevices();
      // Clear input and error state after successful addition
      setPhoneNumber('');
      setFormattedPhoneNumber('');
      setError('');
      setSuccessMessage('Device added successfully.');
      // Clear success message after some time
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // 3 seconds
    } catch (error) {
      console.error('Error adding device:', error.message);
    }
  };

  // Function to validate phone number format
  const isValidPhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  // Function to check if the phone number is unique
  const checkUniquePhoneNumber = async (phoneNumber) => {
    try {
      // Fetch devices by phone number
      const devices = await getAllDevicesByPhoneNumber(phoneNumber);
      // If no devices found, phone number is unique
      return devices.length === 0;
    } catch (error) {
      console.error('Error checking phone number uniqueness:', error.message);
      return false;
    }
  };

  // Function to format phone number as user types
  const handlePhoneNumberChange = (inputPhoneNumber) => {
    const formatted = inputPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    setFormattedPhoneNumber(formatted);
    setPhoneNumber(inputPhoneNumber.replace(/\D/g, '')); // Remove non-numeric characters
  };

  const handleAcknowledgeError = () => {
    setError('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter phone number"
        value={formattedPhoneNumber}
        onChange={(e) => handlePhoneNumberChange(e.target.value)}
      />
      {error && (
        <div>
          <p>{error}</p>
          <button onClick={handleAcknowledgeError}>OK</button>
        </div>
      )}
      {successMessage && <p>{successMessage}</p>}
      <button onClick={handleAddDevice}>Add Device</button>

    </div>
  );
};


export default AddDeviceButton;

