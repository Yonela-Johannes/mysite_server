const PostComment = require("../models/postCommentModel");
const Post = require("../models/postModel");

const getPostComments = async (req, res) => {
  const { id } = req.params
  console.log(req.params)
  return ''

  try {
    const comments = await PostComment.find({post: id}).populate('user').populate('post').sort({"createdAt": -1})
    res.status(200).json(comments)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: error.message})
  }
}

const addPostComment = async (req, res) => {
  const { postId, userId, comment } = req.body;

  if (!postId || !userId || !comment) {
    return res.status(400).json({
      message: "Invalid params provided!"
    });
  }

  const newComment = new PostComment({ post: postId, user: userId, comment });
  try {
    const saveComment = await newComment.save();
    if (saveComment) {
      await Post.findByIdAndUpdate(postId, { $inc: { commentCount: 1 } });
    }
    res.status(200).json({
      status: 'success',
      comment: saveComment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while adding the comment.'
    });
  }
}


const deletePostComment = async (req, res) => {

}

const updatePostComment = async (req, res) => {

}

const likePostComment = async (req, res) => {
  const { id: _id } = req.params;
  const { userId: id } = req.body;

  // if(!req.userId) return res.json({message: 'Unauthenticated'});
  // if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No blog with that id')

  const blog = await BlogComment.findById(_id);
  const updatedPost = await BlogComment.findByIdAndUpdate(_id, {user: userId, likeCount: blog.likeCount + 1}, { new: true});

  res.json(updatedPost)
}

module.exports = {getPostComments, addPostComment, deletePostComment, updatePostComment, likePostComment}
