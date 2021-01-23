const { join } = require("path");
const express = require("express");
const createError = require("http-errors");
const logger = require("morgan");
const sassMiddleware = require("node-sass-middleware");
const serveFavicon = require("serve-favicon");
//const connectMongo = require("connect-mongo");
//const MongoStore = connectMongo("expressSession");
//const mongoose = require("mongoose");

const indexRouter = require("./routes/index");
const authenticationRouter = require("./routes/authentication");

//const User = require("./models/user");

const app = express();

// Setup view engine
app.set("views", join(__dirname, "views"));
app.set("view engine", "hbs");

/* app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    //Cookie related options
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000
    },
    // Database related options
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60
    })
  })
);*/

app.use(express.static(join(__dirname, "public")));
app.use(serveFavicon(join(__dirname, "public/images", "favicon.ico")));

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
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

//app.get (..profile)

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
