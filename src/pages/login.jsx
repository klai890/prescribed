import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import styles from './login.module.css'
import glowing_hand from '../images/glowing_hand.svg'
import logo from '../images/logo.svg'


const Login = () => {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const remember = formData.has('remember') ? true : false; // bc formData won't have property remember if it is not checked.
    
    // Connect to database.
    
    // Add login functionality
    console.log('Login form submitted');
    console.log('Username:', formJson.username);
    console.log('Birthday:', formJson.birthday);
    console.log('Remember', remember)

    var loginSuccessful = true;
    if (loginSuccessful) {
      try {
        navigate(`/prescriptions`);
      } catch (err) {console.error(err)}
    }

  };

  return (
    <div className={styles.main}>
        <div className={styles.mainContainer}>
          <div className={styles.mainPanel}>     


          <div className={styles.leftPanel}>
            
              <div className={styles.loginContainer}>
                  <img src={logo} />
                  <form className={styles.loginForm} onSubmit={handleSubmit}>
                      <div className={styles.formGroup}>
                        <label htmlFor="username" className={styles.textLabel}>Full Name:</label>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          placeholder="Full Name"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="birthday" className={styles.textLabel}>Birthday:</label>
                        <input
                          type="text"
                          name="birthday"
                          id="birthday"
                          placeholder="Birthday"
                        />
                      </div>
                      <div className={styles.smallerInput}>
                        <div><input 
                          type="checkbox"
                          id="remember"
                          name="remember"
                          value="true"
                        /> <label htmlFor="remember">Remember me for 30 days</label></div>
                        
                      </div>
                      <button type="submit">Login</button>
                  </form>
              </div>

            </div>   

            <div className={styles.rightPanel}>
              <img src={glowing_hand} className={styles.handImg}/>
            </div>

          </div>
        </div>

    </div>
  );
};

export default Login;
