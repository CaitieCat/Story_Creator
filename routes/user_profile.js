// All routes for stories defined here
// Loaded into server.js into /user_profile

const express = require('express');
const router  = express.Router();

router.get("/user_profile", (req, res) => {
    res.render("user_profile");
  });

module.exports = router;
