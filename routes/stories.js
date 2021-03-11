// All routes for stories defined here
// Loaded into server.js into /stories

const express = require('express');
const router  = express.Router();
const {allStories} = require('../lib/dbhelpers/stories_db_helper');
//const { newStory } = require('./public/scripts/helpers');

module.exports = (db) => { 
  // can be used if there is an Admin page to list all the clients /* router.get 
  //render the stories page to view all stories
  router.get("/", (req, res) => {
    console.log("Redirected to stories");
    allStories(db)
    .then((stories) => {
      const completeStories = [];
      const inprogressStories = [];
      const tempVar = {completeStories, inprogressStories};
      console.log(stories);
      for(let story of stories) {
        if (!story.story_status) {
          inprogressStories.push(story);
        } else {
          completeStories.push(story);
        } 
      }
    res.render("stories", tempVar);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
   
  });
    
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
        VALUES ($1, $2, $3, $4, $5) RETURNING *`, values)
          .then((data) => {
            console.log("Posted New Story", res.data);
            //append new story
      
            for (const each of res.data){

            }
            res.render("/stories", stories);
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
  })
  return router;
}