const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateAccessAndRefreshTokens } = require("../services/auth");

const handleGetUserSignup = (req, res) => {
  return res.status(200).json({ message: "Signup page" });
};

const handleGetUserSignin = (req, res) => {
  return res.status(200).json({ message: "Signin page" });
};

const handleUserSignup = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user)
    return res.status(400).json({
      error: "This email is already registered!",
    });

  await User.create({
    fullName: name,
    email,
    password,
  });
  return res.status(201).json({ message: "User created successfully" });
};

const handleUserSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // console.log("Current user:", user);
    if (!user)
      return res.status(400).json({
        error: "User does not exist!",
      });

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched)
      return res.status(401).json({
        error: "The password doesn't match!",
      });

    // const jwtToken = setUser(user);
    // res.cookie("token", jwtToken);
    // console.log("Token created:", jwtToken);

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({ message: "Login success", user });
  } catch (err) {
    console.log("Error occurred:", err.message);
    return res.status(500).json({
      error: "An internal error occurred, please try again!",
    });
  }
};

const handleUserLogout = async (req, res) => {
  try {
    console.log("User logging out:", req.user);
    const userId = req.user._id;
    await User.findByIdAndUpdate(
      userId,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    );

    console.log("Successfully removed refresh token from DB.");

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .clearCookie("refreshToken", options)
      .clearCookie("accessToken", options)
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (err) {
    console.log("Error while logging out:", err);

    return res
      .clearCookie("refreshToken", options)
      .clearCookie("accessToken", options)
      .status(200)
      .json({ message: "Logged out successfully" });
  }
};

const handleCheckUser = (req, res) => {
  return res.status(200).json({ user: req.user, message: "User is authenticated" });
};

module.exports = {
  handleGetUserSignin,
  handleGetUserSignup,
  handleUserSignup,
  handleUserSignin,
  handleUserLogout,
  handleCheckUser,
};
