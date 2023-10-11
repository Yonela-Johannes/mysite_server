const  BlogComment = require("../models/blogCommentModel")

const getBlogComments = async (req, res) => {
  const { id } = req.params
  if(id){
    try {
      const comments = await BlogComment.find({blog: id}).populate('user').populate('blog').sort({"createdAt": -1})
      res.status(200).json(comments)
    } catch (error) {
      console.log(error)
      res.status(500).json({message: error.message})
    }
  }else{
    res.json({
      status: 'failed',
      message: 'blog does not exist'
    })
  }
}

const addBlogComment = async (req, res) => {
  const {userId, blogId, comment} = req.body;

  if(userId, blogId, comment){
    try {
      const newComment = new BlogComment({user: userId, blog: blogId, comment})
      const saveComment = await newComment.save();
      res.status(200).json({
        status: 'success',
        comment: saveComment
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({message: error.message})
    }
  }else{
    res.status(400).json({
      message: 'Required fields missing'
    })
  }
}

const deleteBlogComment = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No blog with that id')

  await  BlogComment.findByIdAndRemove(_id);
  res.json({message: 'Blog deleted successfully'});
}

const updateBlogComment = async (req, res) => {
  const { id: _id } = req.params;
  const blog = req.body

  // if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No blog with that id')
  const updateBlog = await BlogComment.findByIdAndUpdate(_id, {...blog, _id}, {new: true});
  res.json(updateBlog)
}

const likeBlogComment = async (req, res) => {
  const { id: _id } = req.params;
  const { userId: id } = req.body;

  // if(!req.userId) return res.json({message: 'Unauthenticated'});
  // if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No blog with that id')

  const blog = await BlogComment.findById(_id);
  const updatedPost = await BlogComment.findByIdAndUpdate(_id, {user: userId, likeCount: blog.likeCount + 1}, { new: true});

  res.json(updatedPost)
}


module.exports = {getBlogComments, addBlogComment, deleteBlogComment, updateBlogComment, likeBlogComment }
