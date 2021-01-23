const express = require("express");
const router = Router();

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/authentication/sign-in", (req, res, next) => {
  res.render("sign-in");
});

router.get("/authentication/sign-out", (req, res, next) => {
  res.render("sign-out");
});

router.get("/profile", (req, res, next) => {
  res.render("profile");
});

module.exports = router;
