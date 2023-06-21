/**
 * prescriptions.jsx : Prescriptions panel
 * 
 * Shows doctors and recommended articles.
 */

import React, {useEffect} from 'react'
import styles from './chat.module.css'
import articles from '../dummydata/articles.json'
import aiLogo from '../images/ai-icon.svg'
import robotImg from '../images/robot.svg'
import chatProfile from '../images/chatprofile.svg'
import sent from '../images/sent.svg'
import chatData from '../dummydata/chat.json'

const Chat = ({articleId}) => {

    const article = articles.filter(a => a.id == articleId)[0]

    const robotStyles = `${styles.robotSection} ${styles.section}`
    const userStyles = `${styles.section}`

    // Form submit handler.
    const submitQuestion = (e) => {
        var question = e.target.elements.question.value;
        alert(`question '${question}' was submitted`)

        // POST request
        // - response should return bot response
        // - add bot response to DOM
        e.preventDefault()
    }
    

  return (
   <div className={styles.container}>
        <div className={styles.articlePanel}>
            <iframe src={article.link} allow-same-origin="true" sandbox='allow-scripts allow-modals' width='100%' height='100%' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"></iframe>
        </div>

        
        <div className={styles.chatPanel}>
            <div className={styles.top}>
                <h2 className={styles.aiHeader}>AI Medhelper <img src={robotImg} /></h2>
            </div>

            {chatData.map(c => {
                var sectionStyle = c.sender == 0 ? robotStyles : userStyles;
                var logoSource = c.sender == 0 ? aiLogo : chatProfile;

                return (
                    <div className={sectionStyle}>
                        <img src={logoSource} />
                        <p>{c.content}</p>
                    </div>
                )
            })}

            <div className={styles.inputSection}>
                Chat
                <form className={styles.textareaContainer} onSubmit={(e) => submitQuestion(e)}>
                    <textarea type="text" name="question">
                    </textarea>
                    <div className={styles.submit}>
                        <img src={sent} height={"25px"} width={"25px"}/>
                        <input type="submit" name="submit" />
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Chat;
