/**
 * prescriptions.jsx : Prescriptions panel
 * 
 * Shows doctors and recommended articles.
 */

import React, {useState} from 'react'
import logo from '../images/logo-light.svg'
import styles from './prescriptions.module.css'
import Nav from '../components/nav'
import articles from '../dummydata/articles.json'
import resourceIcon from '../images/resource.svg'
import external from '../images/external.svg'
import chevron from '../images/chevron.svg'
import DoctorInfo from '../components/doctor_info'
import Chat from '../components/chat'
import cross from '../images/cross.svg'

function sortByDate (a1, a2) {
    var d1 = new Date(a1['date_prescribed'])
    var d2 = new Date(a2['date_prescribed']);
    console.log(d1); console.log(d2); console.log(d1 > d2)
    return d1 - d2;
}

const Prescriptions = () => {

    const [info, setInfo] = useState(null);
    const [note, setNote] = useState(null);
    const [link, setLink] = useState(null);
    const [doctorId, setDoctorId] = useState(null);
    const [viewArticle, setViewArticle] = useState(false);
    const [doctor, setDoctor] = useState(false); // show doctor panel
    const [articleId, setArticleId] = useState(null); // show article panel

    const unread = articles.filter (article => article.unread)
    const read = articles.filter (article => !article.unread)

    const retrieveInfo = (article_id) => {
        var article = articles.filter(a => a.id == article_id)[0];
        setInfo(article['text'])
        setNote(article['doctor_note'])
        setLink(article['link'])
        setDoctorId(article['doctor_id'])
    }
    
    const processUnread = (e) => {
        var article_id = e.target.id;
        setArticleId(article_id)
        retrieveInfo(article_id);
    }

    const updateInfo = (e) => {
        var article_id = e.target.id;
        retrieveInfo(article_id);
    }

    const toggleDoctorPanel = (e) => {
        setDoctor(!doctor);
    }

    const toggleArticlePanel = (e) => {
        if (articleId != null) setViewArticle(!viewArticle);
    }

  return (
    <div className={styles.main}>
        <div className={styles.mainContainer}>

          { 
          (viewArticle == false) ? 

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

                        {/* Search Bar */}
                        <input type="text" placeholder="Search for your prescription..."/>

                        {/* Unread Articles */}
                        <div className={styles.articleContainer}>

                            <div className={styles.unreadContainer}>
                                <p className={styles.readStatus}>Unread</p>
                                {unread.map( a => {
                                    return (
                                    <button onClick={(e) => processUnread(e)} className={styles.articleButton} id={a.id}>
                                        <div className={styles.thumbnail} id={a.id}>
                                            <div className={styles.imageContainer}><img src={a.image} width={300} id={a.id}/></div>
                                            <p className={styles.title} id={a.id}>{a.title}</p>
                                        </div>
                                    </button>)
                                })}
                            </div>


                            {/* Read Articles */}
                            <div className={styles.readContainer}>
                                <p className={styles.readStatus}>Recent</p>
                                {read.map( a => {
                                    return (
                                    <button onClick={(e) => updateInfo(e)} className={styles.articleButton} id={a.id}>
                                        <div className={styles.thumbnail} id={a.id}>
                                            <div className={styles.imageContainer}><img src={a.image} width={300} id={a.id}/></div>
                                            <p className={styles.title} id={a.id}>{a.title}</p>
                                        </div>
                                    </button>)
                                })}
                            </div>
                        </div>


                    </div>
                </div>
          </div>

            <div className={styles.rightPanel}>

                {
                    (info == null) ? (<h1>Select a Prescription</h1>) 
                    
                    : 

                    // Doctor panel not toggled.
                    (doctor == false) ?
                    
                    <>
                        {/* Doctor's Note Section */}
                        <div className={`${styles.topSection} ${styles.doctorSection}`}>
                            <h1>Doctor's Note</h1>
                            <p>{note}</p>
                            <button class={styles.whiteButton} onClick={(e) => toggleDoctorPanel()}>
                                <img src={chevron} /><span>DOCTOR</span>
                            </button>
                        </div>

                        {/* Resource Name Section */}
                        <div className={styles.resourceSection}>
                            <img src={resourceIcon} />
                            <h1 className={styles.resourceHeader}>Resource Name</h1>
                            <p>{info}</p>
                            <button className={styles.resourceButton} onClick={() => toggleArticlePanel()}>
                                View Full Resource <img src={external}></img>
                            </button>
                        </div>
                    </>

                    :

                    // Doctor panel toggled.
                    <>
                        {/* Show doctor panel */}
                        <button className={styles.backButton} onClick={(e) => toggleDoctorPanel()}>
                            <img src={chevron} /><span>BACK</span>
                        </button>
                        <DoctorInfo id={doctorId} />
                    </>

                }
            </div>
          </div>

          :
          // Show Article
          <div className={styles.chatContainer}>
            <button className={styles.exitButton} onClick={(e) => toggleArticlePanel()}><img src={cross} /></button>
            <Chat articleId={articleId}/>
          </div>
        }
        </div>

    </div>
  );
};

export default Prescriptions;
