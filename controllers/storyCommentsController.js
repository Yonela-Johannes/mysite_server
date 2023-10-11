const StoryComment = require("../models/storyCommentModel");
const Story = require("../models/storyModel");

const getVideoComments = async (req, res) => {
  const { id } = req.params
  try {
    const comments = await StoryComment.find({story: id}).populate('user').populate('story').sort({"createdAt": -1})
    res.status(200).json(comments)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: error.message})
  }
}

const addVideoComment = async (req, res) => {
  const { storyId, userId, comment } = req.body;

  if (!storyId || !userId || !comment) {
    return res.status(400).json({
      message: "Invalid params provided!"
    });
  }

  const newComment = new StoryComment({ story: storyId, user: userId, comment });
  try {
    const saveComment = await newComment.save();
    if (saveComment) {
      await Story.findByIdAndUpdate(storyId, { $inc: { commentCount: 1 } });
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


const deleteVideoComment = async (req, res) => {

}

const updateVideoComment = async (req, res) => {

}

const likeVideoComment = async (req, res) => {
  const { id: _id } = req.params;
  const { userId: id } = req.body;

  // if(!req.userId) return res.json({message: 'Unauthenticated'});
  // if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No blog with that id')

  const blog = await StoryComment.findById(_id);
  const updatedPost = await StoryComment.findByIdAndUpdate(_id, {user: userId, likeCount: blog.likeCount + 1}, { new: true});

  res.json(updatedPost)
}

module.exports = {getVideoComments, addVideoComment, deleteVideoComment, updateVideoComment, likeVideoComment}
