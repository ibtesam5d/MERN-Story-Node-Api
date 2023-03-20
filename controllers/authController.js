const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("../utils/createError.js");

// @desc   Register User
// @route  POST /api/auth/register
// @access public
const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = await User.create({ ...req.body, password: hash });

    if (newUser) {
      res.status(201).json({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        token: generateToken(newUser.id, newUser.isAuthor),
      });
    }
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
    const { password, ...userInfo } = user._doc;
    res.status(200).json({
      userInfo,
      token: generateToken(userInfo._id, userInfo.isAuthor),
    });
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

const generateToken = (id, isAuthor) => {
  return jwt.sign(
    {
      id,
      isAuthor,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "30d",
    }
  );
};

module.exports = {
  register,
  login,
  logout,
};
