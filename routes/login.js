/*
 * All routes for login are defined here
 * Since this file is loaded in server.js into /login
 */

const express = require('express');
const router  = express.Router();


module.exports = (db) => {

  // logs a user in

  router.post("/", (req, res) => {
    const user_email = req.body.email;
    const password = req.body.password;
    const values = [user_email, password];
    console.log(values);
    if (user_email === '' || password === '') {
      res.send("Please enter your email and password!");
    } else {
      db.query(`SELECT * FROM users WHERE user_email = $1 AND password = $2`, values)
        .then(data => {
          console.log(data.rows);
          res.cookie('user_id', data.rows[0]['id']);
          res.redirect('/stories');
        })
        .catch(err => {
          console.log(err.message);
          res.send("Invalid email or password");
        });
    }
  });

  return router;
};