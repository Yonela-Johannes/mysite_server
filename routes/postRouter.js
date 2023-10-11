const express = require("express");
const {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  getPost,
  lovePost,
  viewPost,
  getRecentPosts,
  getPopularPosts,
 } = require("../controllers/postControler");

const postRouter = express.Router();

postRouter.get('/', getPosts)
postRouter.get('/recent', getRecentPosts)
postRouter.get('/popular', getPopularPosts)
postRouter.get('/:id', getPost)
postRouter.post('/', createPost);
postRouter.delete('/:id', deletePost);
postRouter.patch('/love', lovePost);
postRouter.patch('/:id', updatePost);
postRouter.patch('/view/:id', viewPost);

module.exports = postRouter;
