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
          {recs.map ( a => {
            return (
              <div className={styles.articleContainer} id={a.id}>
              <div className={styles.thumbnail} id={a.id}>
                  <div className={styles.imageContainer}><img src={a.image} width={300} id={a.id}/></div>
                  <p className={styles.title} id={a.id}>{a.title}</p>
              </div>
            </div>)
          })}
        </div>
      </div>
    </div>
  );
};

export default DoctorInfo;
