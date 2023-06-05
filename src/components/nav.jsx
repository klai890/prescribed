/**
 * prescriptions.jsx : Prescriptions panel
 * 
 * Shows doctors and recommended articles.
 */

import React from 'react'
import styles from './nav.module.css'
import { Link } from "react-router-dom";
import profile from '../images/profile.svg'
import doctor from '../images/doctor.svg'
import drug from '../images/drug.svg'
import chat from '../images/chat.svg'


const Nav = () => {

  return (
    <div className={styles.sidenav}>

            <Link to='/profile' className={styles.link}>
                <img src={profile} className={styles.linkImage}/>
                <span className={styles.linkText}>My profile</span>
            </Link>    

            <Link to='/doctors' className={styles.link}>
                <img src={doctor} className={styles.linkImage}/>
                <span className={styles.linkText}>My doctors</span>
            </Link>    

            <Link to='/prescriptions' className={styles.link}>
                <img src={drug} className={styles.linkImage}/>
                <span className={styles.linkText}>Prescriptions</span>
            </Link>            

            <Link to='/chat' className={styles.link}>
                <img src={chat} className={styles.linkImage}/>
                <span className={styles.linkText}>Chat</span>
            </Link>                                                             

    </div>
  );
};

export default Nav;
