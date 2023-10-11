const express = require("express");
const { likePostComment, updatePostComment, deletePostComment, addPostComment, getPostComments } = require("../controllers/postCommentController");

const postCommentRouter = express.Router();

postCommentRouter.get('/all-comments/:id', getPostComments);
postCommentRouter.post('/', addPostComment);
postCommentRouter.delete('/:id', deletePostComment);
// postCommentRouter.update('/:id', updatePostComment)
postCommentRouter.patch('/:id', likePostComment)

module.exports = postCommentRouter
