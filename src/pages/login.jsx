import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import styles from './login.module.css'
import glowing_hand from '../images/glowing_hand.svg'
import logo from '../images/logo.svg'


const Login = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [birthday, setBirthday] = useState('');
  const [remember, setRemember] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value);
  };

  const handleRememberChange = (e) => {
    setRemember(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Connec tto database.

    // Add login functionality
    console.log('Login form submitted');
    console.log('Username:', username);
    console.log('Birthday:', birthday);

    try {
      navigate(`/prescriptions`);
    } catch (err) {console.error(err)}

  };

  return (
    <div className={styles.main}>
        <div className={styles.mainContainer}>
          <div className={styles.mainPanel}>     


          <div className={styles.leftPanel}>
            
              <div className={styles.loginContainer}>
                  <img src={logo} />
                  <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                      <label htmlFor="username" className={styles.textLabel}>Full Name:</label>
                      <input
                        type="text"
                        id="username"
                        value={username}
                        placeholder="Full Name"
                        onChange={handleUsernameChange}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="birthday" className={styles.textLabel}>Birthday:</label>
                      <input
                        type="text"
                        id="birthday"
                        value={birthday}
                        placeholder="Birthday"
                        onChange={handleBirthdayChange}
                      />
                    </div>
                    <div className={styles.smallerInput}>
                      <input 
                        type="checkbox"
                        id="remember"
                        value={remember}
                        onChange={handleRememberChange}
                      /> <label htmlFor="remember">Remember me for 30 days</label>
                    </div>
                    <div className="button-container">
                      <button type="submit">Login</button>
                    </div>
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
