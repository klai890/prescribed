import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import styles from '../login.module.css'
import drStyles from './login.module.css'
import logo from '../../images/logo.svg'

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberChange = (e) => {
    setRemember(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Connec tto database.
    
    // Add login functionality
    console.log('Login form submitted');
    console.log('Email:', email);
    console.log('Password:', password);

    var loginSuccessful = true;
    if (loginSuccessful) {
      try {
        navigate(`/dr/selectpatient`);
      } catch (err) {console.error(err)}
    }

  };

  return (
    <div className={styles.main}>
        <div className={styles.mainContainer}>
          <div className={drStyles.mainPanel}>     


            
              <div className={styles.loginContainer}>
                  <div className={drStyles.heading}>
                    <p id={drStyles.welcome}>Welcome back to</p>
                    <img src={logo} />
                    <p id={drStyles.doctorHeading}>Doctor</p>
                  </div>

                  <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                      <label htmlFor="email" className={styles.textLabel}>Email:</label>
                      <input
                        type="text"
                        id="email"
                        value={email}
                        placeholder="Email"
                        onChange={handleEmailChange}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="password" className={styles.textLabel}>Password:</label>
                      <input
                        type="text"
                        id="password"
                        value={password}
                        placeholder="Password"
                        onChange={handlePasswordChange}
                      />
                    </div>
                    <div className={styles.smallerInput}>
                      <div>
                        <input 
                        type="checkbox"
                        id="remember"
                        value={remember}
                        onChange={handleRememberChange}
                      /> <label htmlFor="remember">Remember me for 30 days</label>
                        </div>
                      <div>
                        Forgot password?
                      </div>
                    </div>
                    <div className="button-container">
                      <button type="submit">Login</button>
                    </div>
                    <div id={drStyles.signupPrompt}>Don't have an account? Sign up</div>
                  </form>
              </div>


          </div>
        </div>

    </div>
  );
};

export default Login;
