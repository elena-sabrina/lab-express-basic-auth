const express = require("express");
//const bcryptjs = require("bcryptjs");

const User = require("./../models/user");

const router = new express.Router();

router.get("/sign-up", (req, res, next) => {
  res.render("sign-up");
});

router.post("/sign-up", (req, res, next) => {
  const data = req.body;

  User.findOne({
    email: data.email
  })
    .then((user) => {
      if (user) {
        throw new Error("Email is already used by someone else");
      } else {
        return bcryptjs.hash(data.password, 20);
      }
    })
    /*
    .then(passwordHashAndSalt => {
      // After having hashed the password
      // we want to go ahead and create a new user account
      return User.create({
        name: data.name,
        email: data.email,
        passwordHashAndSalt: passwordHashAndSalt
      });
    })
    .then(user => {
      req.session.userId = user._id;
      res.redirect('/profile');
    })*/
    .catch((error) => {
      next(error);
    });
});

router.get("/sign-in", (req, res, next) => {
  res.render("sign-in");
});

/*router.post("/sign-in", (req, res, next) => {
  const data = req.body;
  let user;
  User.findOne({
    email: data.email
  })
    .then((doc) => {
      user = doc;
      if (user) {
        return bcryptjs.compare(data.password, user.passwordHashandSalt);
      } else {
        throw new Error("No user with that email");
      }
    })
    .then((result) => {
      if (result) {
        req.session.user = user;
        res.redirect("/profile");
      } else {
        throw new Error("Password doesnt match");
      }
    })
    .cath((error) => {
      next(error);
    });
});


*/

module.exports = router;
