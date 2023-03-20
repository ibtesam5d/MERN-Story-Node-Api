const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");
const verifyToken = (req, res, next) => {
  // get token from logged-in user
  const token = req.cookies.accessToken;
  if (!token) return next(createError(401, "please login to make changes"));

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) {
      return next(createError(403, "only account owner can make changes"));
    }

    req.userId = payload.id;
    req.isAuthor = payload.isAuthor;

    next();
  });
};

module.exports = verifyToken;
