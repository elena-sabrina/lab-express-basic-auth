const express = require("express");
const router = new express.Router();

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile", (req, res, next) => {
  res.render("profile");
});

router.get("/main", (req, res, next) => {
  res.render("main");
});

router.get("/private", (req, res, next) => {
  let user = req.session.userId;
  if (user) {
    res.render("private");
  } else {
    res.render("please-sign-in");
  }
});

module.exports = router;
