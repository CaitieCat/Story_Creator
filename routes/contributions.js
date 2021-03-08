// All routes for story contributions defined here
// Loaded into server.js into /api/contributions

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
    router.get("/", (req, res) => {
        res.render("story_contributions");
    });
  return router;
};