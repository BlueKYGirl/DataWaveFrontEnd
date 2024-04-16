 import React from 'react';
 import { Link } from 'react-router-dom';
  import '../styles/header.css';

 export class Header extends React.Component {
          userName = "Hunter Atkins";
         
    render() {
         return (
             <div>
               
               <header>
               <img alt="DataWave logo" src="../../full_logo_trans.png" />
                <nav>
                    
                
                <div className='accountMenu'>
                <h2>Account</h2></div>
                <div className='deviceMenu'>
                <h2>Devices</h2></div>
                
                <div className='login'>
                <h2><Link to="/login" className="link">Sign In</Link></h2>
                </div>
                </nav>
                </header>
             </div>
         )
    }
 }