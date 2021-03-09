// All routes for stories defined here
// Loaded into server.js into /stories

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
    //render the stories page to view all stories
    router.get("/", (req, res) => {
        res.render("stories");
    });
    router.get("/:story_id", (req, res) => {
        res.render("story_contributions");
    });
    router.post("/:story_id", (req, res) => {
      console.log("Posted a contribution!");
    });
  return router;
}
