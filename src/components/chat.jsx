/**
 * prescriptions.jsx : Prescriptions panel
 * 
 * Shows doctors and recommended articles.
 */

import React from 'react'
import styles from './chat.module.css'
import articles from '../dummydata/articles.json'
import aiLogo from '../images/ai-icon.svg'
import robotImg from '../images/robot.svg'
import chatProfile from '../images/chatprofile.svg'
import sent from '../images/sent.svg'

const Chat = ({articleId}) => {

    const article = articles.filter(a => a.id == articleId)
    

  return (
   <div className={styles.container}>
        <div className={styles.articlePanel}>
            Article Panel
        </div>

        
        <div className={styles.chatPanel}>
            <div className={styles.top}>
                <h2 className={styles.aiHeader}>AI Medhelper <img src={robotImg} /></h2>
            </div>

            <div className={`${styles.robotSection} ${styles.section}`}>
                <img src={aiLogo} />
                <p>
                    Hello! Do you have any worries or questions about this resource? Don’t worry, 
                    I’m here to help and answer any questions you may have. Just let me know any questions 
                    on your mind and we’ll work together to make sure you feel informed.
                </p>
            </div>
            <div className={styles.section}>
                <img src={chatProfile} />
                <p>
                    What is lung cancer?
                </p>
            </div>

            <div className={styles.inputSection}>
                Chat
                <div className={styles.textareaContainer}>
                    <textarea type="text">
                    </textarea>
                    <div className={styles.submit}>
                        <img src={sent} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Chat;
