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
import articles from '../dummydata/articles.json'
import DoctorInfo from '../components/doctor_info'
import doctors from '../dummydata/doctors.json'
import { useRef } from 'react';


const Doctors = () => {

    const [doctorId, setDoctorId] = useState(null);
    const doctorsRef = useRef(null);
    
    const getMap = () => {
        // Initialize the Map on first usage.
        if (!doctorsRef.current) doctorsRef.current = new Map();
        return doctorsRef.current;
    }
    
    const getDoctor = (id) => {
        const map = getMap();
        var node;
        
        if (doctorId) {
            node = map.get(doctorId);
            node.className= `${doctorStyles.doctorContainer} ${doctorStyles.notSelected}`
        }

        setDoctorId(id);
        node = map.get(id);
        node.className = `${doctorStyles.doctorContainer} ${doctorStyles.selected}`
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
                            {doctors.map( d => {
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
                </div> : <div className={styles.rightPanel}><h1>Select a Doctor</h1></div>
            }
          </div>
        </div>

    </div>
  );
};

export default Doctors;
