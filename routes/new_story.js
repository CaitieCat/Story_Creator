const express = require('express');
const router  = express.Router();

module.exports = (db) => {
    //render the story creation page
    router.get("/", (req, res) => {
        res.render("create_stories");
    });
    //post a new story
    router.post("/", (req, res) => {
        console.log("Posted a story!");
    });
  return router;
}