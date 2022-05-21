import Link from 'next/link';
import React from 'react'
import Meta from '../../components/Meta';
import { server } from '../../config';
const { NEXT_PUBLIC_API } = process.env;

const Article = ({ article }) => {
  return (
    <>
      <Meta title={`${article.title} | WebDev News`} />
      <h1 style={{ textTransform: 'uppercase' }}>{article.title}</h1>
      <h3>ID: {article.id}</h3>
      <p>{article.body}</p>
      <br />
      <Link href='/'>Go Back</Link>
    </>
  )
}

/* (SSR)
- Only runs on server-side
- Runs at request time
- Should use getServerSideProps only 
  if you need to render a page whose data must be fetched at request time. 
*/
// export const getServerSideProps = async (context) => {
//   const res = await fetch(`${NEXT_PUBLIC_API}/posts/${context.params.id}`);
//   const article = await res.json();

//   return {
//     props: {
//       article
//     }
//   }
// }

/* (SSG)
- Fetching data at build time (it runs on the server)
*/
export const getStaticProps = async (context) => {
  const res = await fetch(`${server}/api/articles/${context.params.id}`);
  const article = await res.json();

  return {
    props: {
      article
    }
  }
}

/* (SSG)
- If a page has Dynamic Routes and uses 'getStaticProps'
- Statically generate all paths (posts/1, ... , posts/20) 
  ,even though we added only 6 posts to the home page
*/
export const getStaticPaths = async () => {
  const res = await fetch(`${server}/api/articles`);
  const articles = await res.json();

  const ids = articles.map(article => article.id);
  const paths = ids.map(id => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  }
}

export default Article