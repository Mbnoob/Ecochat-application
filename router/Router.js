require("dotenv").config();
const express = require("express");
const router = express.Router();
const connection = require("../config/mongoDB");
const registardSchema = require('../schemas/registardSchemas')

const { registard, login, logout } = require("../models/user");
// Middleware.........
const { isLogin, isLogout } = require("../middleware/auth");

router.get("/signin", isLogout, (req, res) => {
  res.render("login");
});

router.get("/signup", isLogout, (req, res) => {
  res.render("registard");
});

router.get("/dashboard", isLogin, async(req, res) => {
  let allUsers = await registardSchema.find({ _id: {$nin: [req.session.user._id ]} });
  res.render("dashboard", { user: allUsers, currentUser: req.session.user });
});

router.post("/signup", registard);

router.post("/signin", login);

router.get("/logout", logout);

module.exports = router;
