const express = require("express");
const { loginUser, getAllUsers, getUser, updateUser, blockUser, unblockUser, findUser } = require("../controllers/userController");
const { isAdmin, protect } = require("../middlewares/authMiddleware");

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.get("/users", getAllUsers);
userRouter.get("/users/search", findUser);
userRouter.get("/user/:userId", getUser);
userRouter.patch("/update/:userId", updateUser);
userRouter.put("/block-user", blockUser);
userRouter.put("/unblock-user", unblockUser);

module.exports = userRouter;
