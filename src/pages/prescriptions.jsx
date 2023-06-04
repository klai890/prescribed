/**
 * prescriptions.jsx : Prescriptions panel
 * 
 * Shows doctors and recommended articles.
 */

import React from 'react'
import logo from '../images/logo-light.svg'
import styles from './prescriptions.module.css'
import './prescriptions.module.css'


const Prescriptions = () => {

  return (
    <div className={styles.main}>
        <div className={styles.mainContainer}>
          <div className={styles.mainPanel}>     


          <div className={styles.leftPanel}>
            
              <div className={styles.loginContainer}>
                  <img src={logo} />

              </div>

            </div>   

            <div className={styles.rightPanel}>
                <h1>Select a Prescription</h1>
            </div>

          </div>
        </div>

    </div>
  );
};

export default Prescriptions;
