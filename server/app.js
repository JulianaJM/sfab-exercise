require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const routes = require("./routes/index");

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const BUILD_DIR = path.join(__dirname, "../frontend/build");
app.use(express.static(BUILD_DIR));

app.use("/api", routes);

app.get("*", function(req, res) {
  res.redirect("/");
});
// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log(err, res, req);
  // send the error
  res.status(err.status || 500);
  res.json({ message: err.message });
});

module.exports = app;
