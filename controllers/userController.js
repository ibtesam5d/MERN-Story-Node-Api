const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");

// Delete your own account
const deleteUser = async (req, res, next) => {
  // finding account owner to verify with logged-in user
  const user = await User.findById(req.params.id);
  // jwt verification
  // matching logged-in user with account owner
  if (req.userId !== user._id.toString())
    return next(
      createError(403, "only account owner can delete their account")
    );
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("account deleted");
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  deleteUser,
  getUser,
};
