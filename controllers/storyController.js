const mongoose = require('mongoose');
const Story =  require("../models/storyModel");
const User = require('../models/userModel');

const getStories = async (req, res) => {
  try {
      const story = await Story.find().populate('user').sort({"createdAt": -1}).populate('lovedUsers');
      res.status(200).json(story)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

const getRecentStories = async (req, res) => {
  try {
      const story = await Story.find().populate('user').sort({"createdAt": -1}).populate('lovedUsers').limit(3);
      res.status(200).json(story)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

const getStory = async (req, res) => {
  const { id: _id } = req.params;
  try {
      const story = await Story.findById(_id).populate('user').populate('lovedUsers');
      res.status(200).json(story)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

const createStory = async (req, res) => {
  const { userId, caption, story } = req.body

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
    const newPost = new Story({story, caption, user: userId, createdAt: new Date().toISOString()})
    console.log(newPost)
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}

const updateStory = async (req, res) => {
  const { id: _id } = req.params;
  const story = req.body

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No story with that id')
  const updatedPost = await Story.findByIdAndUpdate(_id, {...story, _id}, {new: true});
  res.json(updatedPost)
}

const deleteStory = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No story with that id')

  await  Story.findByIdAndRemove(_id);
  res.json({message: 'Story deleted successfully'});
}

const loveStory = async (req, res) => {
  const { storyId, userId } = req.body;

  if (!userId || !storyId) {
    return res.json({ message: 'Unauthenticated' });
  }

  try {
    const story = await Story.findById(storyId);

    if (!story) {
      return res.json({ message: 'Story not found' });
    }

    const index = story.lovedUsers.findIndex((id) => id === userId);

    if (index === -1) {
      // User hasn't loved the story story yet, add the user to the list of lovedUsers
      story.lovedUsers.push(userId);
      story.loveCount += 1;

      const updatedPost = await story.save();

      return res.json(updatedPost);
    } else {
      return res.json({ message: 'User already liked story story' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const viewStory = async (req, res) => {
  const { id: _id } = req.params;
  console.log(req.params)
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No story with that id')

  const story = await Story.findById(_id);
  const updatedPost = await Story.findByIdAndUpdate(_id, {viewCount: story.viewCount + 1}, { new: true});

  res.json(updatedPost)
}

module.exports = {createStory, getRecentStories, getStories, getStory, updateStory, deleteStory , loveStory, viewStory}
