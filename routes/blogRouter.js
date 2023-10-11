const express = require("express");
const {
  getBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
  getBlog,
  loveBlog,
  viewBlog,
  getRecentBlogs,
 } = require("../controllers/blogController");

const blogRouter = express.Router();

blogRouter.get('/', getBlogs)
blogRouter.get('/recent', getRecentBlogs)
blogRouter.get('/:id', getBlog)
blogRouter.post('/', createBlog);
blogRouter.delete('/:id', deleteBlog);
blogRouter.patch('/love', loveBlog);
blogRouter.patch('/:id', updateBlog);
blogRouter.patch('/view/:id', viewBlog);

module.exports = blogRouter;
