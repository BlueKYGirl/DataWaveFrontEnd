import React, { useState, useEffect } from "react";
import { getAllPlans } from "../services/planService";
import { PlanDetails } from "../Components/PlanDetails"; // Import PlanDetails component
import "../styles.css";
import {Header} from "../Components/Header";
import {Footer} from "../Components/Footer";

export function Home() {
    const [plans, setPlans] = useState([]);

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
            <h1>Home</h1>
            <div className="plan-details-container">
                {plans.map((plan) => (
                    <PlanDetails key={plan.id} plan={plan} />
                ))}
            </div>
            <Footer />
        </>
    );
}