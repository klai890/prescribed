// Component for Doctors to edit their profiles.

import React, {useState} from "react";
import styles from './editprofile.module.css'
import doctorData from '../dummydata/doctors.json'
import pencil from '../images/pencil-lg.svg'

const EditProfile = ({id}) => {

    // Fetch doctor information.
    const info = doctorData.filter(d => d.id == id)[0]
    const [file, setFile] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        console.log(formData);
    
    }


    return (
        <div className={styles.container}>
            <h2>Edit Profile</h2>
            <div id={styles.doctorFrameOuter}>
                <div className={styles.doctorFrame} id={id}>
                    <img src={info.image} width={300} id={id}/>
                </div>
            </div>

            <form method="post" onSubmit={handleSubmit} className={styles.form}>

                <div className={styles.formName}>
                        <label htmlFor="firstName"> First Name
                        <input 
                            type="text" 
                            name="firstName"
                            id="firstName"
                            placeholder={info.name} />
                        </label>

                        <label htmlFor="lastName"> Last Name
                        <input 
                            type="text" 
                            name="lastName"
                            id="lastName" 
                            placeholder={info.name} />
                        </label>
                </div>

                
                <label htmlFor="email"> Email
                <input 
                    type="text" 
                    name="email"
                    id="email" 
                    placeholder={info.email}/>
               </label> 
                    
                <label htmlFor="password"> Password
                <input 
                    type="password" 
                    name="password"
                    id="password" />
                </label>
                <label htmlFor="profession"> Profession
                <input 
                    type="text" 
                    name="profession"
                    id="profession"
                    placeholder={info.field} />
                </label>
                <label htmlFor="specialtyDiseases"> Specialty Diseases
                <input 
                    type="text" 
                    name="specialtyDiseases"
                    id="specialtyDiseases" />
                </label>

                <button type="submit">Submit form</button>

            </form>
        </div>
    )
}

export default EditProfile;