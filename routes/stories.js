  // All routes for stories defined here
// Loaded into server.js into /stories

const express = require('express');
const router  = express.Router();
const { allStories, allContributions, storyStart, storyCompleted, storyUpdated, getContribution, allUpvotes, storyByID, contributionAccepted } = require('../lib/dbhelpers/stories_db_helper');
//const { newStory } = require('./public/scripts/helpers');

module.exports = (db) => {

  // render the stories page to view all stories

  // can be used if there is an Admin page to list all the clients /* router.get 
  //render the stories page to view all stories
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
    const user_id = req.cookies['user_id'];
    const title = req.body.title;
    const content = req.body.content;
    const created_at = new Date().toISOString();
    const values = [user_id, title, content, created_at];
    db.query(
      `INSERT INTO stories (user_id, title, content, created_at)
        VALUES ($1, $2, $3, $4)`, values)
      .then((data) => {
        res.redirect("/stories");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // view individual story with its current contributions

  router.get('/:id', (req, res) => {
    //grab values from url and cookies
    const story_id = req.params.id;
    const created_by = req.query.created_by_user;
    const user_id = req.cookies['user_id']
    console.log("Redirected to a unique story");
    //pass to ejs
    const tempVar = {story_id, user_id, story_id, created_by};

    //get all contributions
    const userContributions = allContributions(db, story_id)
    .then((user_contributions) => {
      //creating an array to loop through in ejs
      const contributions = [];
      //add each contribution to the array
      for (let each of user_contributions) {
          contributions.push(each);
      }
      //passing the array to templateVars
      tempVar.contributions = contributions;
      //getting the beginning of the story
      const storyContent = storyStart(db, story_id)
      .then((data) => {
        //passing the templateVars the story content
        tempVar.storyContent = data[0]['content'];
        const getUpvotes = allUpvotes(db)
        .then((data) => {
          console.log(data);
          const upvotes = data[2]['count'];
          tempVar.upvotes = upvotes;
          const storyStatus = storyByID(db, story_id)
          .then((data) => {
            const status = data[0]['story_status'];
            tempVar.status = status;
            //rendering the page while passing the templateVars
            res.render("story_contributions", tempVar);
          })
        })
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
    const user_id = req.cookies['user_id'];
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

  router.post('/upvotes/:id', (req, res) => {
    console.log(req.params.id);
    const contribution_id = req.params.id;
    const user_id = req.cookies['user_id'];
    const values = [user_id, contribution_id];
    db.query(`INSERT INTO upvotes ( user_id, user_contributions_id)
    VALUES ($1,$2)`, values)
    .then((data) => {
      res.redirect('back');
    })
      .catch((err) => {

      })
    });

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

// update story with contribution
  router.post('/:id/storyUpdate/:conId', (req, res) => {
    const contribution_id = parseInt(req.params.conId);
    const story_id = parseInt(req.params.id);
    console.log(story_id);
    const content = getContribution(db, contribution_id)
    .then((data) => {
      const content = ' ' + data[0]['contribution'];
      console.log("Story appended to");
      const contributionStatus = contributionAccepted(db, contribution_id)
      .then((data) => {
        const storyComplete = storyUpdated(db, story_id, content)
      })
      .then((data) =>{
       res.redirect('/stories');
     })
    })
    
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({ error: err.message });
    });
  })


  return router;
};
