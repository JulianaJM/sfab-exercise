const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

const headers = {
  Authorization: `Token ${process.env.SKETCHFAB_TOKEN}`
};

const load = (type, req, res) => {
  let cursor = "";
  if (req.query.cursors) {
    cursor = `?cursor=${req.query.cursors}`;
  }
  const url = `https://api.sketchfab.com/v3/me/${type}${cursor}`;
  const options = {
    method: "GET",
    headers
  };
  fetch(url, options)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.json(err);
    });
};

router.get("/profile", (req, res, next) => {
  const url = "https://api.sketchfab.com/v3/me";
  const options = {
    method: "GET",
    headers
  };
  fetch(url, options)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.json(err);
    });
});

router.get("/likes", (req, res, next) => {
  //console.log(req.query);
  load("likes", req, res);
});

router.get("/models", (req, res, next) => {
  console.log(req.query);
  load("models", req, res);
});

module.exports = router;
