const express = require("express");
const {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
  lovePost,
 } = require("../controllers/postController");

const postRouter = express.Router();

postRouter.get('/', getPosts);
postRouter.get('/:id', getPost)
postRouter.post('/', createPost);
postRouter.delete('/:id', deletePost);
// postRouter.patch('/:id', updatePost);
postRouter.patch('/love', lovePost);

module.exports = postRouter;
