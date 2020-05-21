require("dotenv").config();

const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");

const app = express();
// require database configuration

require("./configs/db.config");

// Cross-Origin Resource Sharing

app.use(
  cors({
    origin: [process.env.FRONTEND_POINT],
    credentials: true, // this needs set up on the frontend side as well
    //                   in axios "withCredentials: true"
  })
);

// Middleware Setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// make sure express- session is used before the passport
require("./configs/session.config")(app);

require("./configs/passport/passport.config.js")(app);

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

// const index = require('./routes/index');
// app.use('/', index);
//      |  |  |
//      |  |  |
//      V  V  V
app.use("/", require("./routes/index.routes"));
app.use("/", require("./routes/author.routes"));
app.use("/", require("./routes/book.routes"));
app.use("/", require("./routes/authentication.routes"));

module.exports = app;
