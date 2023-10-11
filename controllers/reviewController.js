const Review = require("../models/reviewModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../config/validateMongoDbId");

const createReview = asyncHandler (async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    let data = { user: _id, comment: req.body.comment, color: req.body.color };
    const review = await Review.created(data);
  } catch (error) {
    throw new Error(error)
  }
});

const reviews = asyncHandler (async (req, res) => {
  try {
    const review = await Review.find().populate("user");
    res.status(200).json({
      status: true,
      message: "Fetch Reviews Successfully!",
      review,
    });
  } catch (error) {
    throw new Error(error)
  }
});

const verify = asyncHandler (async (req, res) => {
  const { reviewId } = req.body
  validateMongoDbId(reviewId);
  try {
    const review = await Review.findByIdAndUpdate(reviewId, {is_approved: true}, {new: true});
    res.status(200).json({
      status: true,
      message: "Review Verified Successfully",
      review,
    });
  } catch (error) {
    throw new Error(error)
  }
});

const unVerify = asyncHandler (async (req, res) => {
  const { reviewId } = req.body
  validateMongoDbId(reviewId);
  try {
    const review = await Review.findByIdAndUpdate(reviewId, {is_approved: false}, {new: true});
    res.status(200).json({
      status: true,
      message: "Review Unverified Successfully",
      review,
    });
  } catch (error) {
    throw new Error(error)
  }
});

const updateReview = asyncHandler (async (req, res) => {
  const { reviewId, comment, color } = req.body
  validateMongoDbId(reviewId);
  try {
    const review = await Review.findByIdAndUpdate(reviewId,
      {
        comment, color
      }, {new: true});
    res.status(200).json({
      status: true,
      message: "Review Unverified Successfully",
      review,
    });
  } catch (error) {
    throw new Error(error)
  }
});


module.exports = { createReview, reviews, verify, unVerify, updateReview };
