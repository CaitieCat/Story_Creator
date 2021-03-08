const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  //route to send login information
  router.get("/", (req, res) => {
    console.log(req.body);
  });
  return router;
};