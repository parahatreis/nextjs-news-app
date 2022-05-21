import ArticleList from "../components/ArticleList";
import Meta from "../components/Meta";
import { server } from "../config";
const { NEXT_PUBLIC_API } = process.env;

export default function Home({ articles }) {
  return (
    <div>
      <Meta title='Home | WebDev News' />
      <ArticleList articles={articles} />
    </div>
  )
}

/* (SSG)
- Fetching data at build time (it runs on the server)
*/
export const getStaticProps = async () => {
  const res = await fetch(`${server}/api/articles`);
  const articles = await res.json();

  return {
    props: {
      articles
    }
  }
}