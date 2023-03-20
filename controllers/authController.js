const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("../utils/createError.js");

// register user
const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    res.status(201).send("new user created");
  } catch (error) {
    next(error);
  }
};

// login user
const login = async (req, res, next) => {
  try {
    // find unique user
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "user not found"));

    // compare password
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "incorrect username or password"));

    // send user info
    const token = jwt.sign(
      {
        id: user._id,
        isAuthor: user.isAuthor,
      },
      process.env.JWT_SECRET_KEY
    );
    const { password, ...userInfo } = user._doc;
    res
      // .cookie("accessToken", token, {
      //   httpOnly: true,
      //   secure: false,
      //   sameSite: "lax",
      //   // maxAge: 7 * 24 * 60 * 60 * 1000,
      // })
      .status(200)
      .send(userInfo);
  } catch (error) {
    next(error);
  }
};

// logout user
const logout = async (req, res) => {
  res
    // .clearCookie("accessToken", {
    //   sameSite: "lax",
    //   secure: false,
    // })
    .status(200)
    .send("user logged-out successfully");
};

module.exports = {
  register,
  login,
  logout,
};
