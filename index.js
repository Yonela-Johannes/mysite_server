const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const mongoose = require('mongoose')
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { authMiddleware, isAdmin } = require("./middlewares/authMiddleware");
const { handleError, notFound } = require("./middlewares/errorHandler");
const app = express();
const userRouter = require("./routes/userRoutes");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const songCommentRouter = require("./routes/songComment");
const albumRouter = require("./routes/albumRouter");
const songsRouter = require("./routes/songsRouter");
const albumCommentRouter = require("./routes/albumComment");
const artistsRouter = require("./routes/artistsRouter");
const blogRouter = require("./routes/blogsRouter");
const categoryRouter = require("./routes/categoryRouter");
const blogCommentRouter = require("./routes/blogComments");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "mysecret",
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 12 * 60 * 60
    })
  })
)

app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }))
app.use(cors({origin: ['http://localhost:3000', 'https://yonela-johannes.github.io', 'https://yonela-johannes.github.io/mysite', 'https://johannesyonela.engineer'], credentials: true}));

app.use("/api/user", userRouter);
app.use("/api/songs", songsRouter);
app.use("/api/artists", artistsRouter);
app.use("/api/blog-comment", blogCommentRouter);
app.use("/api/post-comment", songCommentRouter);
app.use("/api/album-comment", albumCommentRouter);
app.use("/api/album", albumRouter);
app.use('/api/blog',  blogRouter);
app.use("/api/category", categoryRouter);

app.use(notFound)
app.use(handleError)


const server = app.listen(PORT, () => {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("db connected"))
    .catch((err) => console.log(err.message));
  console.log(`Server is running at http://localhost:${PORT}`)
});
