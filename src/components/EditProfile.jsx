// Component for Doctors to edit their profiles.

import React, {useState} from "react";
import styles from './editprofile.module.css'
import doctorData from '../dummydata/doctors.json'

const EditProfile = ({id}) => {

    // Fetch doctor information.
    const [profile, setProfile] = useState(null)

    // Get profile from database
    const getProfile = () => {
        if (doctorData) {
            setProfile(doctorData.filter(d => d.id == id)[0])
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <button>Back</button>
            
            <p>Edit Profile</p>
            <div className={styles.doctorImg}>
                {/* <img src={profile.image} /> */}
            </div>

            <form onSubmit={handleSubmit}>
                
            </form>
        </div>
    )
}

export default EditProfile;