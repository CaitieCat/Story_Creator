// All routes for stories defined here
// Loaded into server.js into api/stories

const express = require('express');
const router  = express.Router();

router.get("/", (req, res) => {
    res.render("stories");
});
module.exports = router;
