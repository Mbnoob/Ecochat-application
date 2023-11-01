require("dotenv").config();
const express = require("express");
const router = express.Router();
const connection = require("../config/mongoDB");
const registardSchema = require('../schemas/registardSchemas');
const { upload } = require('../multer/upload');

const { registard, login, updateUser, logout } = require("../models/user");
// Middleware.........
const { isLogin, isLogout } = require("../middleware/auth");

router.get('/',isLogout, (req,res)=>{
  res.render('index');
})

router.get("/signin", isLogout, (req, res) => {
  res.render("login");
});

router.get("/signup", isLogout, (req, res) => {
  res.render("registard");
});

router.get("/dashboard", isLogin, async(req, res) => {
  let allUsers = await registardSchema.find({ _id: {$nin: [req.session.user._id ]} });
  let presentUser = await registardSchema.find({ _id: req.session.user._id });
  res.render("dashboard", { user: allUsers, currentUser: req.session.user, whoLogin: presentUser });
});

// router.get("/dashboard/profile/settings/:id", isLogin, async(req,res)=>{
//   // Somethings do,........
//   let alldetails = await registardSchema.find({ _id: req.params.id });
//   res.render('userSettings', { alldetails: alldetails});
// });

router.get('/dashboard/profile/settings', (req,res)=>{
  res.render('userSettings')
})

router.post('/update', updateUser);

router.post("/signup", upload.single("file"), registard);

router.post("/signin", login);

router.get("/logout", logout);

router.get('*', (req,res)=>{
  res.redirect('/')
})

module.exports = router;
