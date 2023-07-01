/**
 * chat.jsx
 */

import React from 'react'
import logo from '../images/logo-light.svg'
import styles from './prescriptions.module.css'
import Nav from '../components/nav'

// Sort articles in chronological order (most recent at the front)
function sortDatesAscending(articles) {
    return articles.sort(function(a, b) {
      return a.date_prescribed - b.date_prescribed;
    });
  }

const Chat = () => {
    
  return (
    <div className={styles.main}>
        <div className={styles.mainContainer}>
          <div className={styles.mainPanel}>     
            <div class={styles.leftPanel}>

                {/* Left panel top section = Prescribed logo */}
                <div class={styles.topSection}>
                    <img src={logo} />
                </div>


                {/* Left panel bottoom section = Main content */}
                <div class={styles.bottomSection}>
                    <Nav />
                    <div class={styles.column}>
                        <div className={styles.articleContainer}></div>
                    </div>
                </div>

          </div>

            <div className={styles.rightPanel}>
                <h1>Chat Panel – Coming Soon!</h1>
            </div>
        </div>
    </div>
    </div>
  );
};

export default Chat;
