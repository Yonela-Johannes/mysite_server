const mongoose = require('mongoose');
const Post =  require("../models/postModel");
const User = require('../models/userModel');

const getPosts = async (req, res) => {
  try {
      const post = await Post.find().populate('user').sort({"createdAt": -1}).populate('lovedUsers');
      res.status(200).json(post)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

const getRecentPosts = async (req, res) => {
  try {
      const post = await Post.find().populate('user').sort({"createdAt": -1}).populate('lovedUsers').limit(3);
      res.status(200).json(post)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

const getPopularPosts = async (req, res) => {
  // { loveCount: { $gt: 50 } }
  try {
      const post = await Post.find().populate('user').sort({"createdAt": -1}).populate('lovedUsers').limit(10);
      res.status(200).json(post)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

const getPost = async (req, res) => {
  const { id: _id } = req.params;
  try {
      const post = await Post.findById(_id).populate('user').populate('lovedUsers');
      res.status(200).json(post)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

const createPost = async (req, res) => {
  const { userId, title, post, image } = req.body

  if(!userId) req.json({
    message: 'No user provided'
  });

   const findUser = await User.findById(userId);

   if(!findUser) req.json({
    message: 'User does not exist'
  });

   if(findUser.isAdmin === false) req.json({
    message: 'User not authorized'
  });

  try {
    const newPost = new Post({post, title, image, user: userId, createdAt: new Date().toISOString()})
    console.log(newPost)
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}

const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')
  const updatedPost = await Post.findByIdAndUpdate(_id, {...post, _id}, {new: true});
  res.json(updatedPost)
}

const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

  await  Post.findByIdAndRemove(_id);
  res.json({message: 'Post deleted successfully'});
}

const lovePost = async (req, res) => {
  const { postId, userId } = req.body;

  if (!userId || !postId) {
    return res.json({ message: 'Unauthenticated' });
  }

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.json({ message: 'Post not found' });
    }

    const index = post.lovedUsers.findIndex((id) => id === userId);

    if (index === -1) {
      // User hasn't loved the post post yet, add the user to the list of lovedUsers
      post.lovedUsers.push(userId);
      post.loveCount += 1;

      const updatedPost = await post.save();

      return res.json(updatedPost);
    } else {
      return res.json({ message: 'User already liked post post' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const viewPost = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

  const post = await Post.findById(_id);
  const updatedPost = await Post.findByIdAndUpdate(_id, {viewCount: post.viewCount + 1}, { new: true});

  res.json(updatedPost)
}

module.exports = {createPost, getPopularPosts, getRecentPosts, getPosts, getPost, updatePost, deletePost , lovePost, viewPost}
