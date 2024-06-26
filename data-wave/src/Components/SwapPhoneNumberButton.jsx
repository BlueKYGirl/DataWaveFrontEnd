import React, { useState, useEffect } from 'react';
import { swapPhoneNumber } from '../services/deviceService';
import { formatPhoneNumber } from '../functions/phoneNumber';

const SwapPhoneNumberButton = ({ device1Id, device1PhoneNumber, updateDevices, devices }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [swapSuccess, setSwapSuccess] = useState(false);

  useEffect(() => {
    let timeout;
    if (swapSuccess) {
      timeout = setTimeout(() => {
        setSwapSuccess(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [swapSuccess]);

  const handleSwapPhoneNumber = async () => {
    try {
      // Find the selected device object
      const selectedDevice = devices.find(device => device.id === selectedDeviceId);
      // Swap phone numbers between the two devices
      await swapPhoneNumber({
        device1: { phoneNumber: device1PhoneNumber },
        device2: { phoneNumber: selectedDevice.phoneNumber }
      });
      // Update the list of devices
      updateDevices();
      // Show success notification
      setSwapSuccess(true);
      // Hide confirmation dialog
      setShowConfirmation(false);
    } catch (error) {
      console.error('Error swapping phone numbers:', error.message);
    }
  };

  return (
    <>
      <button id='swapPhoneButton'onClick={() => setShowConfirmation(true)}>Switch Phone Number</button>
      {showConfirmation && (
        <div>
          <p id='swapPhoneMessage'>Are you sure you want to swap phone numbers for this device?</p>
          <select value={selectedDeviceId} onChange={(e) => setSelectedDeviceId(e.target.value)}>
            <option value="">Select the new phone #</option>
            {/* Map over devices and render options */}
            {/* Exclude the current device */}
            {devices
              .filter(device => device.id !== device1Id)
              .map(device => (
                <option key={device.id} value={device.id}>{formatPhoneNumber(device.phoneNumber)}</option>
              ))
            }
          </select>
          <button id='confirmSwapButton'onClick={handleSwapPhoneNumber}>Confirm</button>
          <button id='swapCancelButton'onClick={() => setShowConfirmation(false)}>Cancel</button>
        </div>
      )}
      {swapSuccess && <p id='swapSuccessMessage'>Phone numbers swapped successfully!</p>}
    </>
  );
};

export default SwapPhoneNumberButton;
