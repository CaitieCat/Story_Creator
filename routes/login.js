
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  //route to send login information
  router.post("/", (req, res) => {
    console.log(req.body);
  });
  return router;
};