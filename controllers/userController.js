const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../config/validateMongoDbId")
const jwt = require('jsonwebtoken')
const sendmail = require("../controllers/emailController")

// Login to existing user
// @desc Login to existing user
// @route POST /api/users/login
// @access Private
const loginUser = asyncHandler( async (req, res, next) => {
  const { oauthCode } = req.body
  const userInfo = jwt.decode(oauthCode)
  let { email, given_name, family_name, picture, email_verified } = userInfo

  if(email){
    // check if user exist or not
    const findUser = await User.findOne({ email })
    console.log(findUser)
    if(findUser){
      const { given_name, family_name, email, picture, isAdmin, isBlocked, servers, members, channels, _id} = findUser
      res.status(200).json({
        status: true,
        message: "User Fetch Successfull!",
        user: {
          _id,
          given_name,
          family_name,
          email,
          picture,
          isAdmin,
          isBlocked,
        }
      });
    } else {
      // create the user

      const createdUser = await User.create({email, given_name, family_name, picture, email_verified});
      if(createdUser){
        const { given_name, quote, family_name, email, picture, isAdmin, isBlocked, servers, members, channels, _id} = createdUser
        res.status(201).json({
          status: true,
          message: "User Created Successfully!",
          user: {
            _id,
            given_name,
            family_name,
            email,
            picture,
            isAdmin,
            isBlocked,
            servers,
            members,
            channels,
            quote,
          }
        });
      }
    }
  }else {
    throw new Error("Invalid Credentials")
  }
});

// Fetch all users
// @desc Retrieve all user
// @route POST /api/users/update
const getAllUsers = asyncHandler(async (req, res) => {
    try {
      const allUsers = await User.find();
      res
        .status(200)
        .json({
          status: true,
          message: "All Users Fetched Successfully",
          Users: allUsers,
        })
    } catch (error){
      throw new Error('Something went wrong')
    }
});

// Fetch user
// @desc Get user
// @route POST /api/user/:id
// access Admin/Users
const getUser = asyncHandler(async (req, res) => {
  const { userId } = req.params
  console.log("This is the user Id:: ::", userId)
  try {
    const user = await User.findById(userId);
    if(user){
      res
        .status(200)
        .json({
          status: true,
          message: "User Fetched Successfully",
          user,
        })
    }else{
      throw new Error("User does not exist")
    }
  } catch (error){
    throw new Error(error)
  }
});

// Find user
// @desc search user
// @route POST /api/user?search
// access public
const findUser = asyncHandler(async (req, res) => {
  try {
    const keyword  = req.query.search ?
    {
      $or: [
        { name: { $regex: req.query.search, $options: "i"}},
        { email: { $regex: req.query.search, $options: "i"}},
      ],
    }
    : {};
    if(keyword){
      const users = await User.find(keyword).find({_id: {$ne: req.body.userId}});
      res
        .status(200)
        .json({
          status: true,
          message: "User Fetched Successfully",
          users,
        })
    }else{
      throw new Error("User does not exist")
    }
  } catch (error){
    throw new Error(error)
  }
});
// Update user
// @desc edit user
// @route POST /api/update/:id
// access Admin/User
const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params
  validateMongoDbId(userId)
  try {
    const user = await User.findByIdAndUpdate({_id: userId},req.body ,{new: true}
    );
    res
      .status(200)
      .json({
        status: true,
        message: "Profile Updated Successfully",
        user,
      })
  } catch (error){
    throw new Error('Something went wrong')
  }
});

// Block user
// @desc block user from site
// @route POST /api/block-users
// access Admin
const blockUser = asyncHandler(async (req, res) => {
  const { userId } = req.body
  validateMongoDbId(userId)
  console.log({userId})
  try {
    const user = await User.findByIdAndUpdate({_id: userId}, {is_blocked: true} ,{new: true}
    );
    res
      .status(200)
      .json({
        status: true,
        message: "Profile Blocked Successfully",
        user,
      })
  } catch (error){
    throw new Error('Something went wrong')
  }
});

// Block user
// @desc block user from site
// @route POST /api/block-users
// access Admin
const unblockUser = asyncHandler(async (req, res) => {
  const { userId } = req.body
  validateMongoDbId(userId)
  try {
    const user = await User.findByIdAndUpdate({_id: userId}, {is_blocked: false} ,{new: true}
    );
    res
      .status(200)
      .json({
        status: true,
        message: "Profile Unblocked Successfully",
        user,
      })
  } catch (error){
    throw new Error('Something went wrong')
  }
});

// Logout user
// @desc log user out
// @route POST /api/users/logout
// access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'User logged out'});
});


module.exports = {
  loginUser,
  logoutUser,
  getAllUsers,
  getUser,
  findUser,
  updateUser,
  blockUser,
  unblockUser,
}
