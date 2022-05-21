import { articles } from '../../../data';

export default function handler(req, res) {
  const { id } = req.query;

  const article = articles.find(article => article.id === id);
  
  if (article) return res.status(200).json(article);
  return res.status(404).json({
    msg: 'Not found'
  });
}