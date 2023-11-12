const mongoose = require('mongoose');
const Song =  require("../models/songModel");
const User = require('../models/userModel');
const Artist = require('../models/artistModel');

const getArtists = async (req, res) => {
  try {
      const artist = await Artist.find().populate('user').sort({"createdAt": -1}).populate('lovedUsers');
      res.status(200).json(artist)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

const getArtist = async (req, res) => {
  const { id } = req.params;
  try {
      const artist = await Artist.findById(id).populate('user').populate('lovedUsers');
      res.status(200).json({artist})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}


const updateArtist = async (req, res) => {
  const { artistId } = req.params;
  const { name, title, quote, location } = req.body;

  try {
    // Find the existing user data
    const artistData = await Artist.findById(artistId);

    if (artistData) {
      console.log(artistData)
      // Merge the existing data with the new data
      const updateArtistData = {
        ...artistData.toObject(), // Convert Mongoose document to plain JavaScript object
        name: name || artistData.name,
        title: title || artistData.title,
        location: location || artistData.location,
        quote: quote || artistData.quote,
        // Add more fields as needed
      };

      // Update the user
      const artist = await Artist.updateOne({ _id: artistData._id }, updateArtistData);

      res.status(200).json({
        status: true,
        message: "Artist Updated Successfully",
        artist,
      });
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }

}

const deleteArtist = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No artist with that id')

  await  Artist.findByIdAndRemove(_id);
  res.json({message: 'Artist deleted successfully'});
}

const loveArtist = async (req, res) => {
  const { artistId, userId } = req.body;

  if (!userId || !artistId) {
    return res.json({ message: 'Unauthenticated' });
  }

  try {
    const artist = await Artist.findById(artistId);

    if (!artist) {
      return res.json({ message: 'Artist not found' });
    }

    const index = artist.lovedUsers.findIndex((id) => id === userId);

    if (index === -1) {
      // User hasn't loved the artist artist yet, add the user to the list of lovedUsers
      artist.lovedUsers.push(userId);
      artist.loveCount += 1;

      const updatedArtist = await artist.save();

      return res.json(updatedArtist);
    } else {
      return res.json({ message: 'User already liked artist artist' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const viewArtist = async (req, res) => {
  const { id } = req.params;
  console.log(req.params)
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No artist with that id')

  const artist = await Artist.findById(id);
  const updatedArtist = await Artist.findByIdAndUpdate(id, {viewCount: artist.viewCount + 1}, { new: true});

  res.json(updatedArtist)
}

module.exports = { getArtists, getArtist, updateArtist, deleteArtist , loveArtist, viewArtist}
