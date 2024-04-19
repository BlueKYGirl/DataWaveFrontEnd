import React, { useState, useEffect, useContext } from "react";
import UserContext from "./context/UserContext";
import { getAllPlans } from "../services/planService";
import { PlanDetails } from "../Components/PlanDetails"; // Import PlanDetails component
import { getUserById } from "../services/userService"; // Import getUserById function
import "../styles.css";
import { Header } from "../Components/Header";
import { Footer } from "../Components/Footer";

export function Home() {
    const { userGuid } = useContext(UserContext);
    const [user, setUser] = useState(null); // State to store user details
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        // Fetch user details when userGuid changes
        const fetchUserDetails = async () => {
            try {
                if (userGuid) {
                    const userData = await getUserById(userGuid);
                    setUser(userData);
                }
            } catch (error) {
                console.error("Error fetching user details:", error.message);
            }
        };

        fetchUserDetails();
    }, [userGuid]);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const plansData = await getAllPlans();
                setPlans(plansData);
            } catch (error) {
                console.error("Error fetching plans:", error.message);
            }
        };

        fetchPlans();
    }, []);

    return (
        <>
            <Header />
<body>
            <div className="logo-container">
           
            <img className="wordLogo" alt="word logo" src="./words_trans.png"/>
            {user && userGuid && <p id="welcome">Welcome, {user.fullName}!</p>} {/* Display user's name if available */}</div>
            <h1 id="slogan">Catch the new wave in affordable device plans.</h1>
<div className="plan-details-container">
    {plans.map((plan) => (
        <PlanDetails key={plan.id} plan={plan} />
    ))}
</div>
<footer>

<Footer /> 
</footer>
</body>     

        </>
    );
}
