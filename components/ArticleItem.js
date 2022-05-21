import Link from 'next/link';
import styles from '../styles/Article.module.css';

const ArticleItem = ( {article }) => {
  return (
    <Link href={`/article/${article.id}`}>
      <a className={styles.card}>
        <h3>{article?.title}</h3>
        <p>{article?.body}</p>
      </a>
    </Link>
  )
}

export default ArticleItem