// All routes for stories defined here
// Loaded into server.js into /user_profile

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
    router.get("/", (req, res) => {
        res.render("user_profile");
    });
  return router;
}
