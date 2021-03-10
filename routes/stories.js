// All routes for stories defined here
// Loaded into server.js into /stories

const express = require('express');
const router  = express.Router();
//const { newStory } = require('./public/scripts/helpers');

module.exports = (db) => {
  //render the stories page to view all stories
  router.get("/", (req, res) => {
    res.render("stories");
  });
    
  //post a new story
  // router.post("/", (req, res) => {
  //   //const user_id = req.cookies['user_id'];
  //   const user_name = req.cookies['user_name'];
  //   //const title = req.body.title;
  //   const content = req.body.content;
  //   const created_at = NOW();
  //   const story_image = req.body.story_image;
  //   const theme_id = req.body.theme_id;
  //   const values = [user_id, title, content, created_at, story_image, theme_id];
  //   console.log("Posted a story!");
  //   console.log("Values", values);
  //   console.log('values =', values);
    
  //   db.query(
  //     `INSERT INTO stories (user_id, title, content, created_at, story_image, theme_id)
  //     VALUES ($1, $2, $3, $4, $5, $6)`, values)
  //       .then((data) => {
  //         console.log("Post New Story", res.data);
  //         res.redirect("/stories");
  //       })
  //       .catch((err) => {
  //         res.status(500).json({ error: err.message });
  //       });
  //   });

// router.get("/:story_id", (req, res) => {
//   res.render("user_contributions");
// });

//post a new story
// router.post("/", (req, res) => {
//   const story_id = req.body.story_id;
//   const user_id = req.body.user_id;
//   const contribution = req.body.contribution;
//   const contributed_at = NOW();
//   const accepted = req.body.accepted;
//   const values = [story_id, user_id, contribution, contributed_at, accepted];
  
//   console.log("Posted a story!");
//   console.log("Values", values);
  
//   db.query(
//     `INSERT INTO user_contributions (story_id, user_id, contribution, contributed_at, accepted)
//     VALUES ($1, $2, $3, $4, $5)`, values)
//       .then((data) => {
//         console.log("Post New Story", res.data);
//         res.redirect("/stories");
//       })
//       .catch((err) => {
//         res.status(500).json({ error: err.message });
//       });
//   });
// return router;
// };
  router.post('/', (req, res) =>{
    console.log("I'm a post!");
    const user_id = 1;
    const title = "title";
    const content = req.body.content;
    const created_at = new Date().toISOString();
    const theme_id = 1;
    const values = [user_id, title, content, created_at, theme_id];
    console.log(values);
    db.query(
        `INSERT INTO stories (user_id, title, content, created_at, theme_id)
        VALUES ($1, $2, $3, $4, $5)`, values)
          .then((data) => {
            console.log("Posted New Story", res.data);
            res.redirect("/stories");
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
  })
  return router;
}