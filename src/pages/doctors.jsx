/**
 * prescriptions.jsx : Prescriptions panel
 * 
 * Shows doctors and recommended articles.
 */

import React, {useState} from 'react'
import logo from '../images/logo-light.svg'
import styles from './prescriptions.module.css'
import doctorStyles from './doctors.module.css'
import infoStyles from '../components/doctor_info.module.css'
import Nav from '../components/nav'
import { useRef } from 'react';
import doctorData from '../dummydata/doctors.json'
import articleData from '../dummydata/articles.json'
import doctorImg from '../images/doctor_img.jpg'
import cross from '../images/cross.svg'
import Chat from '../components/chat'

const Doctors = () => {

    // Potentially merge doctorId and doctorInfo? For now, doctorInfo, articles depend on doctorId.
    const [doctorId, setDoctorId] = useState(null); // Doctor id.
    const [doctorInfo, setDoctorInfo] = useState(null); // Doctor's information
    const [articles, setArticles] = useState(null); // Doctor's recommended articles
    const doctorsRef = useRef(null); // useRef to change styles of selected doctor.

    // Viewing Article Panel.
    const [articleId, setArticleId] = useState(null); // show article panel
    const [viewArticle, setViewArticle] = useState(false);


    // Map getter for useRef
    const getMap = () => {
        // Initialize the Map on first usage.
        if (!doctorsRef.current) doctorsRef.current = new Map();
        return doctorsRef.current;
    }
    
    // Set information and conditionally change styles.
    const getDoctor = (id) => {
        const map = getMap();
        var node;
        
        if (doctorId) {
            node = map.get(doctorId);
            node.className= `${doctorStyles.doctorContainer} ${doctorStyles.notSelected}`
        }

        // Set information
        setDoctorId(id);
        if (id && doctorData) {
            setDoctorInfo(doctorData.filter(d => d.id == id)[0])
            setArticles(articleData.filter ( article => article.doctor_id == id))
        }
        // Change styles
        node = map.get(id);
        node.className = `${doctorStyles.doctorContainer} ${doctorStyles.selected}`
    }

    const toggleArticlePanel =  (e) => {
        if (articleId != null) setViewArticle(!viewArticle);
    }

    const updateArticleInfo = (article_id) => {
        setArticleId(article_id);
        toggleArticlePanel()    
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
                        <input type="text" placeholder="Search for your prescription..."/>

                        {/* Unread Articles */}
                        <div className={styles.articleContainer}>
                            {doctorData.map( d => {
                                return (
                                    <div
                                        key={d.id}
                                        ref={(node) => {
                                            const map = getMap();
                                            map.set(d.id, node);
                                            console.log(map)
                                            console.log(map.get(d.id));
                                        }}
                                        className={`${doctorStyles.doctorContainer} ${doctorStyles.notSelected}`} onClick={() => getDoctor(d.id)}>

                                            <div id={d.id} className={doctorStyles.doctorImg}><img id={d.id} src={d.image} /></div>
                                            <div id={d.id} className={doctorStyles.headers}>
                                                <p id={d.id}>Dr. {d.name}</p>
                                                <p id={d.id} className={doctorStyles.byline}>{d.field}</p>
                                            </div>
                                    </div>
                                )
                            })}
                        </div>


                    </div>
                </div>
          </div>
        
            {doctorId ? 
                <div className={infoStyles.rightPanel}>
                    <div className={infoStyles.container}>

                    {/* Doctor overview */}
                    <div className={infoStyles.top}>
                    <div className={infoStyles.doctorImg}><img src={doctorImg} /></div>
                    <div className={infoStyles.doctorHeader}>
                        <h1>Dr. {doctorInfo.name}</h1>
                        <h2 className={infoStyles.byline}>{doctorInfo.field}</h2>
                        <div className={infoStyles.specialtyContainer}>
                        <h3 className={infoStyles.bylineSmaller}>Speciality Diseases</h3>
                        <ul>
                            {doctorInfo["diseases"].map(d => {
                            return (<li>{d}</li>)
                            })}
                        </ul>
                        </div>
                    </div>
                    </div>

                    {/* About the doctor */}
                    <div className={infoStyles.middle}>
                        <h1 className={infoStyles.headingAlt}>About the Doctor</h1>
                        <p>{doctorInfo.about}</p>
                    </div>

                    {/* Prescriptions by doctor */}
                    <div className={infoStyles.bottom}>
                    <h1 className={infoStyles.headingAlt}>Prescriptions</h1>
                    <div className={infoStyles.articleContainer}>
                        {articles.map ( a => {
                            var article_date = new Date(a.date_prescribed)
                            console.log(article_date.toLocaleDateString());
                            return (
                                <div className={infoStyles.article}>
                                <button onClick={() => updateArticleInfo(a.id)} className={infoStyles.articleButton} id={a.id}>
                                    <p className={infoStyles.date}>{article_date.toLocaleDateString()}</p>
                                    <div className={infoStyles.thumbnail} id={a.id}>
                                        <div className={infoStyles.imageContainer}><img src={a.image} width={300} id={a.id}/></div>
                                        <p className={infoStyles.title} id={a.id}>{a.title}</p>
                                    </div>
                                </button>
                            </div>)
                        })}
                    </div>
                    </div>
                    </div>

                </div> : <div className={infoStyles.rightPanel}><h1>Select a Doctor</h1></div>
            }
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

export default Doctors;
