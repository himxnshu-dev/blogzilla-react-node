const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const userRouter = require("./routes/user");
const blogRoute = require("./routes/blog");
const { connectMongoDB } = require("./models/connection");
const { checkForUser } = require("./middlewares/auth.middleware");
const cookieParser = require("cookie-parser");
const Blog = require("./models/blog");

// MongoDB connection
connectMongoDB(process.env.MONGO_URI)
  .then(() => console.log("DB connected!"))
  .catch((err) => console.log(err));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Router setup
app.use("/api/user", userRouter);
app.use("/api/blog", blogRoute);

app.get("/api/blogs", checkForUser, async (req, res) => {
  const allBlogs = await Blog.find({});

  return res.status(200).json({
    user: req.user,
    blogs: allBlogs,
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
