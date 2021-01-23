const { router } = require("../app");

router.post("/sign-in", (req, res, next) => {
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
