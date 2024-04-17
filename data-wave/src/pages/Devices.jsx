import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../pages/context/UserContext'; // Import the UserContext
import { getAllDevicesByUserId } from '../services/deviceService'; // Import the function to fetch devices by user
import { Header } from '../Components/Header'; // Import the Header component
import { Footer } from '../Components/Footer'; // Import the Footer component

const Devices = () => {
  const { userGuid } = useContext(UserContext); // Get userGuid from UserContext
  const [devices, setDevices] = useState([]); // State to store user's devices

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        // Fetch devices for the current user
        const userDevices = await getAllDevicesByUserId(userGuid);
        setDevices(userDevices);
      } catch (error) {
        console.error('Error fetching devices:', error.message);
      }
    };

    if (userGuid) {
      fetchDevices(); // Fetch devices only if userGuid is available
    }
  }, [userGuid]); // Run effect when userGuid changes

  return (
    <>
      <Header /> {/* Include the Header component */}
      <div>
        <h1>Devices</h1>
        <ul>
          {/* Map over devices and render them */}
          {devices.map(device => (
            <li key={device.id}>
              {/* Render device details */}
              <p>ID: {device.id}</p>
              <p>Phone Number: {device.phoneNumber}</p>
              {/* Add more device details here */}
            </li>
          ))}
        </ul>
      </div>
      <Footer /> {/* Include the Footer component */}
    </>
  );
};

export default Devices;
