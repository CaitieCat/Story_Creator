// All routes for stories defined here
// Loaded into server.js into /stories

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
    //render the stories page to view all stories
    router.get("/", (req, res) => {
        res.render("stories");
    });
  return router;
}
