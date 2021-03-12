// All routes for stories defined here
// Loaded into server.js into /stories

const express = require('express');
const router  = express.Router();
const { allStories, allContributions, storyStart, storyCompleted, storyUpdated, getContribution } = require('../lib/dbhelpers/stories_db_helper');
//const { newStory } = require('./public/scripts/helpers');

module.exports = (db) => {

  // render the stories page to view all stories

  router.get("/", (req, res) => {
    const user_id = req.cookies['user_id'];
    if (user_id !== undefined){
    console.log("Redirected to stories");
    const user_id = req.cookies['user_id'];
    const stories = allStories(db)
      .then((stories) => {
        const completeStories = [];
        const inprogressStories = [];
        const tempVar = {completeStories, inprogressStories, user_id};
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
    } else {
      res.redirect('http://localhost:8080/');
    }
  });

  // post a new story
    
  router.post('/', (req, res) =>{
    console.log("I'm a post!");
    //const user_id = req.cookies['user_id'];
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

  // view individual story with its current contributions

  router.get('/:id', (req, res) => {
    const story_id = req.params.id;
    const created_by = req.query.created_by_user;
    const user_id = req.cookies['user_id']
    console.log("Redirected to a unique story");
    const tempVar = {story_id, user_id, story_id, created_by};
    const userContributions = allContributions(db, story_id)
    .then((user_contributions) => {
      const contributions = [];
      for (let each of user_contributions) {
          contributions.push(each);
      }
      tempVar.contributions = contributions;
      const storyContent = storyStart(db, story_id)
      .then((data) => {
        tempVar.storyContent = data[0]['content'];
        res.render("story_contributions", tempVar);
    })
      })
      .catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: err.message });
      });

  });

  // post a new contribution

  router.post('/:id', (req, res) => {
    console.log("I'm a contribution!");
    const story_id = parseInt(req.params.id);
    const user_id = 1;
    const contribution = req.body.newContribution;
    const contributed_at = new Date().toISOString();
    const values = [story_id, user_id, contribution, contributed_at];
    db.query(
      `INSERT INTO user_contributions (story_id, user_id, contribution, contributed_at)
        VALUES ($1, $2, $3, $4)`, values)
      .then((data) => {
        res.redirect(`/stories/${story_id}`);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }) 

  // updates the status of the story

  router.post('/:id/statusUpdate', (req, res) => {
    res.redirect("/stories");
    const story_id = parseInt(req.params.id);
    console.log(story_id);
    const storyComplete = storyCompleted(db, story_id)
    .then((data) => {
      })
      .catch((err) => {
        console.log("Error: ", err);
        res.status(500).json({ error: err.message });
      });
  })

  // updates the story to append a contribution to it

  router.post('/:id/storyUpdate', (req, res) => {
    const story_id = parseInt(req.params.id);
    console.log(story_id);
    const content = getContribution(db, id)
    .then((data) => {
      const storyComplete = storyUpdated(db, story_id, content)
      .then((data) => {
        })
        .catch((err) => {
          console.log("Error: ", err);
          res.status(500).json({ error: err.message });
        });
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({ error: err.message });
    });
  })

  return router;
};
