// UserContext.js
import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userGuid, setUserGuid] = useState(null);

  const updateUserGuid = (guid) => {
    setUserGuid(guid);
  };

  return (
    <UserContext.Provider value={{ userGuid, updateUserGuid }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
