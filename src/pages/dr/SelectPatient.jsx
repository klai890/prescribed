import React, {useState, useRef} from 'react';
import styles from './selectpatient.module.css'
import logo from '../../images/logo-light.svg'
import profile from '../../images/profile.svg'
import articles from '../../dummydata/articles.json'
import mainStyles from '../prescriptions.module.css'
import plus from '../../images/plus.svg'
import chevron from '../../images/upward-chevron.svg'
import downChevron from '../../images/down-chevron.svg'
import EditProfile from '../../components/EditProfile'
import pencil from '../../images/pencil.svg'
import leftArrow from '../../images/leftarrow.svg'
import upload from '../../images/upload.svg'
import cross from '../../images/cross-transparent.svg'
import check from '../../images/check-transparent.svg'
import questions from '../../dummydata/questions.json'

const SelectPatient = () => {

    const [name, setName] = useState(null);
    
    // Toggle Views
    const [initialView, setInitialView] = useState(true);
    const [viewProfile, setViewProfile] = useState(false); // view doctor profile.
    const [viewAdd, setViewAdd] = useState(false) // view add resource panel
    const [viewEdit, setViewEdit] = useState(false) // view edit reosurce panel
    const [viewRecommendations, setViewRecommendations] = useState(false) // view recommendations
    const [viewPrescribe, setViewPrescribe] = useState(false) // view prescribe panel
    
    // Edit a particular resource
    const [article, setArticle] = useState(null); // article for resource
    
    const container = useRef(null);
    const questionsRef = useRef(null);

    // Functions for questions accordian in Recommendations section
    const getMap = () => {
        if (!questionsRef.current) {
            questionsRef.current = new Map();
        }
        return questionsRef.current;
    }

    const expandQuestionId = (id) => {
        const map = getMap();
        const node = map.get(id);
        if (node.className == `${styles.questionContainer}`) {
            node.className = `${styles.questionContainer} ${styles.display}`
        }
        else node.className = `${styles.questionContainer}`
    }

    const submitForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        setName(formJson.name) // so it displays on the right panel
    
        // Connect to database
        
        // Add DB search functionality
        console.log('Patient search form submitted');
        console.log(formJson);

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
        setArticle(articles.filter(a => a.id == a_id)[0])
        console.log(viewEdit);
        setViewEdit(true);
    }

    const submitSearch = (e) => {
        
    }

    const submitNewSource = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        // ADD new data to view
        // POST new data
    }

    const submitEditedSource = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        // ADD new data to view
        // POST new data
    }

    // Todo – Token fetch.
    const getDoctorId = (e) => {
        return 1;
    }

    const handleViewPrescribed = (a) => {
        setArticle(a);
        setViewPrescribe(true);
    }

    const handleViewRecommendations = (e) => {
        setViewRecommendations(!viewRecommendations)
    }

    const handlePrescribeSubmission = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        // ADD new data to view
        // POST new data
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
                                    name="name"
                                    placeholder="Name"
                                />
                                <input
                                    type="text"
                                    id="birthday"
                                    name="birthday"
                                    placeholder="Birthday"
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
                            <div className={styles.middleCol}>
                                <button onClick={handleViewProfile} id={styles.profileBackButton}><img src={leftArrow} />Back</button>
                                <EditProfile id={getDoctorId()} />
                            </div>
                        :

                        (initialView) ?
                        <div className={styles.initialView}>
                            <p>Clicking “Confirm” will start an encounter and recording</p>
                        </div>

                        : 
                        
                        // Patient Recommendations
                        <>

                                {viewPrescribe?
                                <div className={styles.middleCol} id={styles.prescribeContainer}>
                                        <button onClick={(e) => setViewPrescribe(false)} id={styles.profileBackButton}>
                                            <img src={leftArrow} />Back
                                        </button>
                                        <div id={styles.articleImage}><img src={article.image} /></div>
                                        <form className={styles.form} onSubmit={handlePrescribeSubmission}>
                                            <label>
                                                <span>Title</span>
                                                <input type="text" value={article.title}/>
                                            </label>

                                            <label>
                                                <span>Summary</span>
                                                <textarea id={styles.summaryTextarea}>
                                                    {article.text}
                                                </textarea>
                                            </label>

                                            <label>
                                                <span>Note to this Patient on resource (optional)</span>
                                                <textarea></textarea>
                                            </label>

                                            <button type="submit">Prescribe to Patient</button>
                                        </form>

                                    </div>

                                    :

                                    (viewEdit) ? 

                                    <div className={styles.blurBackground}>
                                        <button onClick={(e) => setViewEdit(false)} id={styles.profileBackButton}>
                                            <img src={leftArrow} />Back
                                        </button>

                                        <div className={styles.panelHeader}><h1>Edit Resource</h1></div>
                                        <form className={styles.form} onSubmit={submitEditedSource}>
                                                <label>Upload from URL </label>
                                                <div id={styles.urlContainer}>
                                                    <input type="text" />
                                                    <p id={styles.https}>https://</p>
                                                </div>

                                            <label>Note to Patient on resource (optional)
                                                <textarea name="" id="" cols="30" rows="10"></textarea>
                                            </label>

                                            <div className={styles.buttonContainer}>
                                                <button type="reset">Delete <img src={cross} /></button>
                                                <button type="submit">Save <img src={check} /></button>
                                            </div>
                                        </form>
                                    </div>

                                    :

                                    (viewAdd) ? 

                                    <div className={styles.blurBackground}>
                                        <button onClick={(e) => setViewAdd(false)} id={styles.profileBackButton}>
                                            <img src={leftArrow} />Back
                                        </button>

                                        <div className={styles.panelHeader}><h1>Add Resource</h1></div>
                                        <form className={styles.form} onSubmit={submitNewSource}>

                                                <label>Upload from URL
                                                </label>
                                                <div id={styles.urlContainer}>
                                                    <input type="text" />
                                                    <p id={styles.https}>https://</p>
                                                </div>

                                            <label>Note to Patient on resource (optional)
                                                <textarea name="" id="" cols="30" rows="10"></textarea>
                                            </label>

                                            <button type="submit"> Upload 
                                                <img src={upload} width={20} />
                                            </button>
                                        </form>
                                    </div>

                                    :
                                        
                                        (viewRecommendations) ? 
                                        <div className={styles.middleCol} id={styles.middleColRecommendations}>
                                        <div className={styles.header}><h1>Select Prescription Material</h1></div>

                                        <button onClick={(e) => setViewRecommendations(false)} id={styles.profileBackButton}>
                                            <img src={leftArrow} />Back
                                        </button>
                                            <div id={styles.recommendationContainer}>


                                                {/* Articles container */}
                                                <div className={styles.articleContainer}>
                                                    {questions.map(q => {
                                                        const ids = q.article_ids;
                                                        var as = []
                                                        ids.forEach(id => {
                                                            var a = articles.filter(a => a.id == id)[0];
                                                            as.push(a);
                                                            // TODO: sort them.
                                                        })

                                                        return (
                                                            <>
                                                            <button className={styles.question} onClick={(e) => expandQuestionId(q.id)}>
                                                                {q.question}
                                                                <img src={plus} />
                                                            </button>

                                                            <div className={styles.questionContainer}
                                                                key={q.id}
                                                                ref={(node) => {
                                                                const map = getMap();
                                                                if (node) {
                                                                    map.set(q.id, node);
                                                                } else {
                                                                    map.delete(q.id);
                                                                }
                                                                }}
                                                            >
                                                                {as.map(a => {
                                                                    return (
                                                                        <div className={styles.article}>
                                                                            <button onClick={(e) => handleViewPrescribed(a)} className={styles.articleButton} id={a.id}>
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
                                                            </div></>
                                                        )
                                                    })}
                                                    <button id={styles.recommendButton} onClick={handleViewRecommendations}>
                                                        Recommend <img src={downChevron} width={22} />
                                                    </button>
                                                </div>
                                            </div>
                                            </div>
                                        :
                                        <div className={styles.middleCol}>
                                        <h1>Select Prescription Material</h1>
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
                                                            <button onClick={(e) => handleViewPrescribed(a)} className={styles.articleButton} id={a.id}>
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
                                        </div>}
                                



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