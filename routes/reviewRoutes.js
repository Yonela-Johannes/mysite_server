const express = require("express");
const { createReview, updateReview, verify, unVerify } = require("../controllers/reviewController");

const reviewRouter = express.Router();

reviewRouter.get("/", createReview);
reviewRouter.post("/", createReview);
reviewRouter.patch("/update/:reviewId", updateReview);
reviewRouter.put("/verify/:reviewId", verify);
reviewRouter.put("/unverify/:reviewId", unVerify);


module.exports = reviewRouter;
