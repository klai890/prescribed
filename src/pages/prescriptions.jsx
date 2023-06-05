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
import Article from '../components/article'

function sortByDate (a1, a2) {
    var d1 = new Date(a1['date_prescribed'])
    var d2 = new Date(a2['date_prescribed']);
    console.log(d1); console.log(d2); console.log(d1 > d2)
    return d1 - d2;
}

const Prescriptions = () => {

    const [info, setInfo] = useState(null);

    const unread = articles.filter (article => article.unread)
    const read = articles.filter (article => !article.unread)
    console.log(read);
    read.sort(sortByDate)
    console.log(read);

    const retrieveInfo = (article_id) => {
        var article = articles.filter(a => a.id == article_id)[0];
        setInfo(article['text'])
    }
    
    const processUnread = (e) => {
        var article_id = e.target.id;
        retrieveInfo(article_id);
    }

    const updateInfo = (e) => {
        var article_id = e.target.id;
        retrieveInfo(article_id);
    }

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
                <button class={styles.whiteButton}>Button</button>

                {
                    (info == null) ? (<h1>Select a Prescription</h1>) : 

                    <>
                        {/* Doctor's Note Section */}

                        {/* Resource Name Section */}
                        <p>{info}</p>
                    </>

                }
            </div>

          </div>
        </div>

    </div>
  );
};

export default Prescriptions;
