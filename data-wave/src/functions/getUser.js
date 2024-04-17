import { getUserById } from '../services/userService'; // Import getUserById function

export const fetchUserDetails = async (userGuid, setUser) => {
  try {
    if (userGuid) {
      const userData = await getUserById(userGuid);
      setUser(userData);
    }
  } catch (error) {
    console.error("Error fetching user details:", error.message);
  }
};
