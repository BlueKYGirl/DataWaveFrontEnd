 import React from 'react';
 export class Header extends React.Component {
          userName = "Hunter Atkins";
         
    render() {
         return (
             <div>
               
               <header>
               <img src="../../full_logo_trans.png" />
                <nav>
                    
                
                <div className='accountMenu'>
                <h2>Account</h2></div>
                <div className='deviceMenu'>
                <h2>Devices</h2></div>
                
                <div className='login'>
                <h2>Sign In</h2>
                </div>
                </nav>
                </header>
             </div>
         )
    }
 }