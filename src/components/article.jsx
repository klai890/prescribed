import styles from './article.module.css'
import './article.module.css'

const Article = ({title, src}) => {

    return (
        <>
        <div className={styles.thumbnail}>
            <div className={styles.imageContainer}><img src={src} width={300}/></div>
            <p className={styles.title}>{title}</p>
        </div>

        </>

        
  );
};

export default Article;
