/*
 * All routes for logout are defined here
 * Since this file is loaded in server.js into /logout
 */

const express = require('express');
const router  = express.Router();

module.exports = () => {
  router.post("/", (req, res) => {
    res.clearCookie("user_id");
    res.redirect('http://localhost:8080/');
  });

  return router;
};