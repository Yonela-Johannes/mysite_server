const express = require("express");
const {
  getStories,
  getStory,
  createStory,
  deleteStory,
  loveStory,
  updateStory,
  viewStory,
  getRecentStories,
 } = require("../controllers/storyController");

const storiesRouter = express.Router();

storiesRouter.get('/', getStories)
storiesRouter.get('/recent', getRecentStories)
storiesRouter.get('/:id', getStory)
storiesRouter.post('/', createStory);
storiesRouter.delete('/:id', deleteStory);
storiesRouter.patch('/love', loveStory);
storiesRouter.patch('/:id', updateStory);
storiesRouter.patch('/view/:id', viewStory);

module.exports = storiesRouter;
