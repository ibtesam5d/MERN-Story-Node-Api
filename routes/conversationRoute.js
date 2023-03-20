const express = require("express");
const router = express.Router();
const { deleteUser } = require("../controllers/userController");

// @desc GET users
// @route /api/users
router.get("/test", deleteUser);

module.exports = router;
