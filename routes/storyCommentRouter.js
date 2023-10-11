const express = require("express");
const { likeVideoComment, updateVideoComment, deleteVideoComment, addVideoComment, getVideoComments } = require("../controllers/storyCommentsController");

const storyCommentRouter = express.Router();

storyCommentRouter.post('/', addVideoComment);
storyCommentRouter.get('/all-comments/:id', getVideoComments);
storyCommentRouter.delete('/:id', deleteVideoComment);
// storyCommentRouter.update('/:id', updateVideoComment)
storyCommentRouter.patch('/:id', likeVideoComment)

module.exports = storyCommentRouter
