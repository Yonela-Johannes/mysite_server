const mongoose = require('mongoose');
const Blog =  require("../models/blogModel");

const getBlogs = async (req, res) => {
  try {
      const blogs = await Blog.find().populate('user').sort({"createdAt": -1}).populate('lovedUsers');
      res.status(200).json(blogs)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

const getRecentBlogs = async (req, res) => {
  try {
      const blogs = await Blog.find().populate('user').sort({"createdAt": -1}).populate('lovedUsers').limit(5);
      res.status(200).json(blogs)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

const getBlog = async (req, res) => {
  const { id: _id } = req.params;
  try {
      const blog = await Blog.findById(_id).populate('user').populate('lovedUsers');
      res.status(200).json(blog)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

const createBlog = async (req, res) => {
  const post = req.body;
  console.log(post)
  const newBlog = new Blog({...post, user: post.userId, createdAt: new Date().toISOString()})
  try {
    await newBlog.save();
    res.status(200).json(newBlog)
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}

const updateBlog = async (req, res) => {
  const { id: _id } = req.params;
  const blog = req.body

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No blog with that id')
  const updateBlog = await Blog.findByIdAndUpdate(_id, {...blog, _id}, {new: true});

  res.json(updateBlog)
}

const deleteBlog = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No blog with that id')

  await  Blog.findByIdAndRemove(_id);
  res.json({message: 'Blog deleted successfully'});
}

const loveBlog = async (req, res) => {
  const { ids } = req.body;
  const { blogId, userId } = ids;

  if (!userId || !blogId) {
    return res.json({ message: 'Unauthenticated' });
  }

  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.json({ message: 'Blog not found' });
    }

    const index = blog.lovedUsers.findIndex((id) => id === userId);

    if (index === -1) {
      // User hasn't loved the blog post yet, add the user to the list of lovedUsers
      blog.lovedUsers.push(userId);
      blog.loveCount += 1;

      const updatedBlog = await blog.save();

      return res.json(updatedBlog);
    } else {
      return res.json({ message: 'User already liked blog post' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const viewBlog = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No blog with that id')

  const blog = await Blog.findById(_id);
  const updatedBlog = await Blog.findByIdAndUpdate(_id, {viewCount: blog.viewCount + 1}, { new: true});

  res.json(updatedBlog)
}

module.exports = {createBlog, getRecentBlogs, getBlogs, getBlog, updateBlog, deleteBlog , loveBlog, viewBlog}
