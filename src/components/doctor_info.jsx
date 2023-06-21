/**
 * prescriptions.jsx : Prescriptions panel
 * 
 * Shows doctors and recommended articles.
 */

import React from 'react'
import styles from './doctor_info.module.css'
import doctorImg from '../images/doctor_img.jpg'
import doctorData from '../dummydata/doctors.json'
import articles from '../dummydata/articles.json'

const getDateString = (date) => {
  var mm = ""
  switch(date.getMonth()){
    case (0): mm =  "January"; break;
    case (1): mm =  "February";break;
    case(2): mm =  "March";break;
    case (3): mm =  "April";break;
    case (4): mm =  "May";break;
    case (5): mm =  "June";break;
    case (6): mm =  "July";break;
    case (7): mm =  "August";break;
    case (8): mm =  "September";break;
    case (9): mm =  "October";break;
    case (10): mm =  "November";break;
    case (11): mm =  "December";break;
    default: mm =  ""; return;
  }

  var dd = date.getDate();
  var yy = date.getFullYear();

  return `${mm} ${dd}, ${yy}`
}  


// Sort articles in chronological order (most recent at the front)
function sortDatesAscending(articles) {
  return articles.sort(function(a, b) {
    return a.date_prescribed - b.date_prescribed;
  });
}

const DoctorInfo = ({id}) => {

  const doctor = doctorData.filter(d => d.id == id)[0];
  const recs = articles.filter ( article => article.doctor_id == id)



  return (
   <div className={styles.container}>

      {/* Doctor overview */}
      <div className={styles.top}>
        <div className={styles.doctorImg}><img src={doctorImg} /></div>
        <div className={styles.doctorHeader}>
          <h1>Dr. {doctor.name}</h1>
          <h2 className={styles.byline}>{doctor.field}</h2>
          <div className={styles.specialtyContainer}>
            <h3 className={styles.bylineSmaller}>Speciality Diseases</h3>
            <ul>
              {doctor["diseases"].map(d => {
                return (<li>{d}</li>)
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* About the doctor */}
      <div className={styles.middle}>
        <h1 className={styles.headingAlt}>About the Doctor</h1>
        <p>{doctor.about}</p>
      </div>

      {/* Prescriptions by doctor */}
      <div className={styles.bottom}>
        <h1 className={styles.headingAlt}>Prescriptions</h1>
        <div className={styles.articleContainer}>
          {sortDatesAscending(recs).map ( a => {
            var article_date = new Date(a.date_prescribed)
            var dateStr = getDateString(article_date)
            return (
              <div className={styles.article}>
                <a href={a.link} target="_blank" className={styles.articleLink} id={a.id}>
                      <p className={styles.date}>{dateStr}</p>
                    <div className={styles.thumbnail} id={a.id}>
                        <div className={styles.imageContainer}><img src={a.image} width={300} id={a.id}/></div>
                        <p className={styles.title} id={a.id}>{a.title}</p>
                    </div>
                </a>
              </div>)
          })}
        </div>
      </div>
    </div>
  );
};

export default DoctorInfo;
