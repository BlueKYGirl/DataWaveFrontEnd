import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../pages/context/UserContext';
import { getAllDevicesByUserId } from '../services/deviceService';
import { Header } from '../Components/Header';
import { Footer } from '../Components/Footer';
import AddDeviceButton from '../Components/AddDeviceButton';
import DeleteDeviceButton from '../Components/DeleteDeviceButton';
import SwapPhoneNumberButton from '../Components/SwapPhoneNumberButton';
import { formatPhoneNumber } from '../functions/phoneNumber';

const Devices = () => {
  const { userGuid } = useContext(UserContext);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const userDevices = await getAllDevicesByUserId(userGuid);
        setDevices(userDevices);
      } catch (error) {
        console.error('Error fetching devices:', error.message);
      }
    };

    if (userGuid) {
      fetchDevices();
    }
  }, [userGuid]);

  const updateDevices = async () => {
    try {
      const userDevices = await getAllDevicesByUserId(userGuid);
      setDevices(userDevices);
    } catch (error) {
      console.error('Error updating devices:', error.message);
    }
  };

  return (
    <>
      <Header />
      <div>
        <AddDeviceButton userId={userGuid} updateDevices={updateDevices} />
        <h1>Devices</h1>
        <ul>
          {devices.map(device => (
            <li key={device.id}>
              <p>ID: {device.id}</p>
              <p>Phone Number: {formatPhoneNumber(device.phoneNumber)}</p>
              <DeleteDeviceButton deviceId={device.id} updateDevices={updateDevices} />
              <SwapPhoneNumberButton device1Id={device.id} device1PhoneNumber={device.phoneNumber} updateDevices={updateDevices} devices={devices}/>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default Devices;

