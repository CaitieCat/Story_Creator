const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  //render the story creation page
  router.get("/", (req, res) => {
    res.render("create_a_story");
  });
    
  //post a new story
  router.post("/", (req, res) => {
    const user_id = req.body.user_id;
    const title = req.body.title;
    const content = req.body.content;
    const created_at = NOW();
    const story_image = req.body.story_image;
    const theme_id = req.body.theme_id;
    const values = [user_id, title, content, created_at, story_image, theme_id];
    console.log("Posted a story!");
    console.log("Values", values);
    
    db.query(
      `INSERT INTO stories (user_id, title, content, created_at, story_image, theme_id)
      VALUES ($1, $2, $3, $4, $5, $6)`, values)
        .then((data) => {
          console.log("Post New Story", res.data);
          res.redirect("/stories");
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    });
  return router;
};