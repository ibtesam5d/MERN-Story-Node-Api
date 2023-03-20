const express = require("express");
const router = express.Router();
const { deleteUser } = require("../controllers/userController");
const verifyToken = require("../middlewares/jwt.js");

// @desc   delete user account
// @method DELETE
// @route  /api/users
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
