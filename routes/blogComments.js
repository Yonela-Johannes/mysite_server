const express = require("express");
const { likeBlogComment, updateBlogComment, deleteBlogComment, addBlogComment, getBlogComments } = require("../controllers/blogCommentController");

const blogCommentRouter = express.Router();

blogCommentRouter.get('/all-comments/:id', getBlogComments);
blogCommentRouter.post('/', addBlogComment);
blogCommentRouter.delete('/:id', deleteBlogComment);
// blogCommentRouter.update('/:id', updateBlogComment)
blogCommentRouter.patch('/:id', likeBlogComment)

module.exports = blogCommentRouter
