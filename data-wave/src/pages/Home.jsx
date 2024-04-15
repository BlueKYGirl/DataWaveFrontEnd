 import React, {useContext, useEffect} from "react";
 import {Header } from "../Components/Header";
 import {Footer } from "../Components/Footer";

 import '../styles.css';

 export function Home() {

    const [count, setCount] = React.useState(0);
     React.useEffect(() => {
         console.log("Component mounted");
         return () => {
            console.log("Component unmounted");
         };
        }, []);

        return (
         <>
             <Header />
             <h1>Home</h1>
         
         <Footer />
         </>
     );
 }