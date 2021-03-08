// All routes for story contributions defined here
// Loaded into server.js into /api/contributions

const express = require('express');
const router  = express.Router();

router.get("/", (req, res) => {
    res.render("story_contributions");
});
module.exports = router;