/**
 * prescriptions.jsx : Prescriptions panel
 * 
 * Shows doctors and recommended articles.
 */

import React, {useState} from 'react'
import logo from '../images/logo-light.svg'
import styles from './prescriptions.module.css'
import doctorStyles from './doctors.module.css'
import Nav from '../components/nav'
import { useRef } from 'react';
import doctorData from '../dummydata/doctors.json'
import articleData from '../dummydata/articles.json'
import DoctorInfo from '../components/doctor_info'

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

    // Toggle chat panel... if we can get that to work... for now, it's just a link.
    const toggleArticlePanel =  (e) => {
        if (articleId != null) setViewArticle(!viewArticle);
    }

    const updateArticleInfo = (article_id) => {
        setArticleId(article_id);
        toggleArticlePanel()    
    }

    // Search for doctor
    const submitSearch = (e) => {
        e.preventDefault();
        var searchTerm = e.target.elements['search'].value;
        // Tokenize the search terms and remove empty spaces
        var tokens = searchTerm
                      .toLowerCase()
                      .split(' ')
                      .filter(function(token){
                        return token.trim() !== '';
                      });

        console.log(tokens)

        if(tokens.length) {
            
            //  Create a regular expression of all the search terms
            var searchTermRegex = new RegExp(tokens.join('|'), 'gim');
            console.log(searchTermRegex)
            
            var filteredList = doctorData.filter(function(a){
              // Create a string of all object values
              var str = '';
              for (var key in a) {
                if (a.hasOwnProperty(key) && a[key] !== '') {
                  str += a[key].toString().toLowerCase().trim() + ' ';
                }
              }
              // Return book objects where a match with the search regex if found
              return str.match(searchTermRegex);
            });
            console.log(filteredList)
        }
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
                        <form onSubmit={(e) => submitSearch(e)} className={styles.searchForm}>
                            <input className={styles.searchbar} name="search" type="text" placeholder="Search for your doctor..."/>
                            <button type="submit" className={styles.searchButton}>Search</button>
                        </form>

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
                <div className={styles.rightPanel}>
                    <DoctorInfo id={doctorId} />
                </div> : 
                <div className={styles.rightPanel}><h1>Select a Doctor</h1></div>
            }
          </div>
        </div>

    </div>
  );
};

export default Doctors;
