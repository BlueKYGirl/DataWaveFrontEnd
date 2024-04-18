import React, { useState } from 'react';
import { deleteDevice } from '../services/deviceService';

const DeleteDeviceButton = ({ deviceId, updateDevices }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteDevice = async () => {
    try {
      // Delete the selected device
      await deleteDevice(deviceId);
      // Update the list of devices
      updateDevices();
    } catch (error) {
      console.error('Error deleting device:', error.message);
    }
  };

  const handleConfirmDelete = () => {
    handleDeleteDevice();
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      {!showConfirmation ? (
        <button onClick={() => setShowConfirmation(true)}>Delete Device</button>
      ) : (
        <div>
          <p>Are you sure you want to delete this device?</p>
          <button onClick={handleConfirmDelete}>Confirm</button>
          <button onClick={handleCancelDelete}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default DeleteDeviceButton;

