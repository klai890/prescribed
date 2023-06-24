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

// Sort articles in chronological order (most recent at the front)
function sortDatesAscending(articles) {
    return articles.sort(function(a, b) {
      return a.date_prescribed - b.date_prescribed;
    });
  }

const Prescriptions = () => {

    // Render article information
    const [info, setInfo] = useState(null); // article text
    const [note, setNote] = useState(null); // article note
    const [link, setLink] = useState(null); // article link
    
    // Render doctor and chat panels.
    const [doctor, setDoctor] = useState(false);
    const [doctorId, setDoctorId] = useState(null);
    const [articleId, setArticleId] = useState(null); 
    const [viewArticle, setViewArticle] = useState(false);
    const [unread, setUnread] = useState(sortDatesAscending(articles.filter (article => article.unread)));
    const [read, setRead] =  useState(sortDatesAscending(articles.filter(article => article.unread == false)));

    // Allow viewer to read article information
    const showArticle = (article_id) => {
        var article = articles.filter(a => a.id == article_id)[0];

        if (article) {
            setInfo(article['text'])
            setNote(article['doctor_note'])
            setLink(article['link'])
            setDoctorId(article['doctor_id'])
            setArticleId(article_id)
        }

        // Change from unread to read – must be accompanied by a POST request as well.
        if (article && article.unread == true) {
            article.unread = false;        
            console.log(articles.filter (article => article.unread));
            console.log(articles.filter (article => article.unread == false));
            setUnread(sortDatesAscending(articles.filter (article => article.unread)));
            setRead(sortDatesAscending(articles.filter (article => article.unread == false)));
        }

    }

    // Allow viewer to view information of doctor who recommended article.
    const toggleDoctorPanel = () => {
        setDoctor(!doctor);
    }

    // Allow viewer to access article source and chatbot.
    const toggleArticlePanel =  (e) => {
        if (articleId != null) setViewArticle(!viewArticle);
    }

    const submitSearch = (e) => {
        
    }
    
  return (
    <div className={styles.main}>

          { 
          (viewArticle == false) ? 

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

                        {/* Search Bar */}
                        <form onSubmit={(e) => submitSearch(e)}><input className={styles.searchbar} type="text" placeholder="Search for your prescription..."/></form>

                        {/* Unread Articles */}
                        <div className={styles.articleContainer}>

                            <div className={styles.unreadContainer}>
                                <p className={styles.readStatus}>Unread</p>
                                {unread.map( a => {
                                    return (
                                    <button onClick={(e) => showArticle(a.id)} className={styles.articleButton} id={a.id}>
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
                                    <button onClick={(e) => showArticle(a.id)} className={styles.articleButton} id={a.id}>
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
                            <button className={styles.resourceButton} onClick={(e) => toggleArticlePanel()}>
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
          </div>

          :
          // Show Article
          <div className={styles.altMainContainer}>
            <div className={styles.chatContainer}>
                <button className={styles.exitButton} onClick={(e) => toggleArticlePanel()}><img src={cross} /></button>
                <Chat articleId={articleId}/>
            </div>
          </div>
        }
    </div>
  );
};

export default Prescriptions;
