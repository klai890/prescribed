import React, {useState, useRef} from 'react';
import styles from './selectpatient.module.css'
import logo from '../../images/logo-light.svg'
import profile from '../../images/profile.svg'
import articles from '../../dummydata/articles.json'
import mainStyles from '../prescriptions.module.css'
import plus from '../../images/plus.svg'
import chevron from '../../images/upward-chevron.svg'
import EditProfile from '../../components/EditProfile'
import pencil from '../../images/pencil.svg'

const SelectPatient = () => {

    const [name, setName] = useState(null);
    const [birthday, setBirthday] = useState(null);
    
    // Toggle Views
    const [initialView, setInitialView] = useState(true);
    const [viewProfile, setViewProfile] = useState(false); // view doctor profile.
    const [viewAdd, setViewAdd] = useState(false) // view add resource panel
    const [viewEdit, setViewEdit] = useState(false) // view edit reosurce panel
    const [viewRecommendations, setViewRecommendations] = useState(false) // view recommendations
    const [viewPrescribe, setViewPrescribe] = useState(false) // view prescribe panel
    
    // Edit a particular resource
    const [articleId, setArticleId] = useState(null); // article url for resource
    const [note, setNote] = useState(null) // note for patient

    const container = useRef(null)

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleBirthdayChange = (e) => {
        setBirthday(e.target.value)
    }

    const submitForm = (e) => {
        e.preventDefault();
    
        // Connect to database
        
        // Add search functionality
        console.log('Patient search form submitted');
        console.log('Username:', name);
        console.log('Birthday:', birthday);

        // Backend: If such a user exists, set user to that user.
        // If not, create a user with the given credentials.

        var response = true;
        if (response) {
            // Cover the screen with recommendation info.
            setInitialView(false);
            setViewProfile(false);
            container.current.className= `${styles.mainPanel}`
        }
    }

    const handleViewProfile = () => {
        if (!initialView) {
            if (!viewProfile) container.current.className = `${styles.twoCols}`
            else container.current.className= `${styles.mainPanel}`
        }
        
        setViewProfile(!viewProfile);
    }

    const handleViewEdit = (a_id) => {
        setArticleId(a_id);
        console.log(viewEdit);
        setViewEdit(true);
    }

    const submitSearch = (e) => {
        
    }

    // Todo – Token fetch.
    const getDoctorId = (e) => {
        return 1;
    }

    const handleViewRecommendations = (e) => {
        setViewRecommendations(!viewRecommendations)
    }
        
    // if neither view content nor view profile: initialView, "Confirm" prompt, remove middle and right cols
    // if view content: mainPanel, have middle and right cols
    // if view profile: initialView, remove middle and right cols

    return (
        <div className={styles.main}>
            <div className={styles.mainContainer}>
                <div class={styles.twoCols} ref={container}>
                    <div className={styles.leftCol}>
                        <div>
                            <img src={logo} />
                            <form id={styles.searchPatient} onSubmit={submitForm}>
                                <p>Add or Find Patient</p>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    placeholder="Name"
                                    onChange={handleNameChange}
                                />
                                <input
                                    type="text"
                                    id="birthday"
                                    value={birthday}
                                    placeholder="Birthday"
                                    onChange={handleBirthdayChange}
                                />
                                <button type="submit" className={styles.buttonAlt}>Confirm</button>
                            </form>
                        </div>

                        <button className={styles.clearButton} onClick={() => handleViewProfile()}>
                            <img src={profile} className={styles.btnImage} />
                            <span>Edit my Profile</span>
                        </button>

                    </div>

                    {
  
                        // View Profile
                        (viewProfile)?
                            <EditProfile id={getDoctorId()} />
                        :

                        (initialView) ?
                        <div className={styles.initialView}>
                            <p>Clicking “Confirm” will start an encounter and recording</p>
                        </div>

                        : 
                        
                        // Patient Recommendations
                        <>
                            <div className={styles.middleCol}>

                                {viewPrescribe?
                                    <>
                                        <button onClick={(e) => setViewPrescribe(false)}>Back</button>
                                        Prescribe resource
                                    </>

                                    :

                                    (viewEdit) ? 

                                    <>
                                        <button onClick={(e) => setViewEdit(false)}>Back</button>
                                        View Edit Panel
                                    </>

                                    :

                                    (viewAdd) ? 

                                    <>
                                        <button onClick={(e) => setViewAdd(false)}>Back</button>
                                        View Add Panel
                                    </>

                                    :

                                    <>
                                        <h1>Select Prescription Material</h1>

                                        
                                        {/* If want to show recommendations, replace all of this.*/}
                                        {(viewRecommendations) ? 
                                        <>
                                            View Recommendations
                                            {/* Articles container */}
                                            <div className={styles.articleContainer}>
                                                {articles.map( a => {
                                                    return (
                                                    <button onClick={(e) => setViewPrescribe(true)} className={styles.articleButton} id={a.id}>
                                                        <div className={styles.thumbnail} id={a.id}>
                                                            <div className={styles.imageContainer}><img src={a.image} width={300} id={a.id}/></div>
                                                            <p className={styles.title} id={a.id}>{a.title}</p>
                                                        </div>
                                                    </button>)
                                                })}
                                            </div>

                                            <button id={styles.recommendButton} onClick={handleViewRecommendations}>
                                                Recommend <img src={chevron} width={22} />
                                            </button>
                                        </>
                                        :
                                        <>
                                            <form onSubmit={(e) => submitSearch(e)}>
                                                <input className={`${mainStyles.searchbar} ${styles.clearSearchbar}`} type="text" placeholder="Search"/>
                                            </form>
                                            <button className={styles.buttonAlt} id={styles.addButton} onClick={(e) => setViewAdd(true)}>
                                                Add New Prescription <img src={plus} />
                                            </button>

                                            {/* Articles container */}
                                            <div className={styles.articleContainer}>
                                                {articles.map( a => {
                                                    return (
                                                        // Need the extra outer div to position the edit button. too many divs :\
                                                        <div className={styles.article}>
                                                            <button onClick={(e) => setViewPrescribe(true)} className={styles.articleButton} id={a.id}>
                                                                <div className={styles.line}></div>
                                                                <div className={styles.articleHeading}>
                                                                    {/* Link + Title */}
                                                                    <div>
                                                                        <a href={a.link} target="_blank">{a.link}</a>
                                                                        <p className={styles.title} id={a.id}>{a.title}</p> 
                                                                    </div>

                                                                    {/* Image */}
                                                                    <div className={styles.thumbnail} id={a.id}>
                                                                        <div className={styles.imageContainer}><img src={a.image} width={300} id={a.id}/></div>
                                                                    </div>
                                                                </div>

                                                                {/* Text preview */}
                                                                <div className={styles.textPreview}>
                                                                    <p>{a.text}</p>
                                                                </div>

                                                            </button>
                                                            <button className={styles.buttonAlt} id={styles.editButton} onClick={(e) => handleViewEdit(a.id)}>
                                                                Edit <img src={pencil} />
                                                            </button>
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                            <button id={styles.recommendButton} onClick={handleViewRecommendations}>
                                                Recommend <img src={chevron} width={22} />
                                            </button>
                                        </>}
                                    </>
                                }
                                


                            </div>

                            <div className={styles.rightCol}>
                                <h1>{name}'s view</h1>
                            </div>
                        </>
                    }

                </div>
            </div>
        </div>
    );
}

export default SelectPatient;