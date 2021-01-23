const express = require("express");
const router = new express.Router();

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile", (req, res, next) => {
  res.render("profile");
});

module.exports = router;
