const { join } = require("path");
const express = require("express");
const createError = require("http-errors");
const logger = require("morgan");
const serveFavicon = require("serve-favicon");
const sassMiddleware = require("node-sass-middleware");

// NPM I EXPRESS-SESSION & CONNECT-MONGO
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");

//To be able to use MongoStore when saving session info in the database do this:
const MongoStore = connectMongo(expressSession);
const mongoose = require("mongoose");

//REQUIRE USER MODEL
const User = require("./models/user");

//REQUIRE ROUTES

const indexRouter = require("./routes/index");
const authenticationRouter = require("./routes/authentication");

const app = express();

// SETUP VIEW ENGINE
app.set("views", join(__dirname, "views"));
app.set("view engine", "hbs");

//FIND FILE & FAVICON

app.use(express.static(join(__dirname, "public")));
app.use(serveFavicon(join(__dirname, "public/images", "favicon.ico")));

//LOGGER???
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));

//SASSMIDDLEWARE ???
app.use(
  sassMiddleware({
    src: join(__dirname, "public"),
    dest: join(__dirname, "public"),
    outputStyle:
      process.env.NODE_ENV === "development" ? "nested" : "compressed",
    force: process.env.NODE_ENV === "development",
    sourceMap: true
  })
);

//SETUP EXPRESS SESSION MIDDLEWARE
app.use(
  expressSession({
    //secret = incription key for the session ID that is sent to the client
    secret: process.env.SESSION_SECRET,
    //Cookie related options
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000
    },
    // Database related options
    //Where to save the session documents
    //by default it would be saved in the memory of the computer which would be lost as soon as it's turned off
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60
    })
  })
);

// DESERIALIZING THE USER
const userDeserializationMiddleware = (req, res, next) => {
  if (req.session.userId) {
    User.findById(req.session.userId)
      .then((user) => {
        req.user = user;
        res.locals.user = user;
        next();
      })
      .catch((error) => {
        next(error);
      });
  } else {
    next();
  }
};
app.use(userDeserializationMiddleware);

//Mount routers
app.use("/authentication", authenticationRouter);
app.use("/", indexRouter);

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  // Set error information, with stack only available in development
  res.locals.message = error.message;
  res.locals.error = req.app.get("env") === "development" ? error : {};

  res.status(error.status || 500);
  res.render("error");
});

module.exports = app;
