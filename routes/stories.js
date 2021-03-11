// All routes for stories defined here
// Loaded into server.js into /stories

const express = require('express');
const router  = express.Router();
const { allStories, allContributions } = require('../lib/dbhelpers/stories_db_helper');
//const { newStory } = require('./public/scripts/helpers');

module.exports = (db) => {
  // can be used if there is an Admin page to list all the clients /* router.get
  //render the stories page to view all stories
  router.get("/", (req, res) => {
    console.log("Redirected to stories");
    const stories = allStories(db)
      .then((stories) => {
        const completeStories = [];
        const inprogressStories = [];
        const tempVar = {completeStories, inprogressStories};
        for (let story of stories) {
          if (!story.story_status) {
            inprogressStories.push(story);
          } else {
            completeStories.push(story);
          }
        }
        res.render("stories", tempVar);
      })
      .catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: err.message });
      });
  });
    
  router.post('/', (req, res) =>{
    console.log("I'm a post!");
    const user_id = 1;
    const title = req.body.title;
    const content = req.body.content;
    const created_at = new Date().toISOString();
    const theme_id = 1;
    const values = [user_id, title, content, created_at, theme_id];
    db.query(
      `INSERT INTO stories (user_id, title, content, created_at, theme_id)
        VALUES ($1, $2, $3, $4, $5)`, values)
      .then((data) => {
        res.redirect("/stories");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get('/:id', (req, res) => {

    console.log("Redirected to a unique story");
    const userContributions = allContributions(db)
    .then((user_contributions) => {
      const contributions = [];
        const tempVar = { contributions };
        for (let each of user_contributions) {
            contributions.push(each);
        }
        res.render("story_contributions", tempVar);
      })
      .catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: err.message });
      });
  });

  router.post('/:id', (req, res) => {
    console.log("I'm a contribution!");
    const story_id = 1;
    const user_id = 1;
    const contribution = req.body.newContribution;
    const contributed_at = new Date().toISOString();
    const values = [story_id, user_id, contribution, contributed_at];
    db.query(
      `INSERT INTO user_contributions (story_id, user_id, contribution, contributed_at)
        VALUES ($1, $2, $3, $4)`, values)
      .then((data) => {
        res.redirect("/stories/:id");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }) 

  return router;
};
