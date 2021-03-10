/*
 * All routes for login are defined here
 * Since this file is loaded in server.js into /login
 */

const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.post("/", (req, res) => {
    const user_email = req.body.email;
    const user_password = req.body.password;
    const values = [user_email, user_password];
    console.log(values);
    if (user_email === '' || user_password === '') {
      res.sendStatus(403);
    } else {
      db.query(`SELECT user_name
      FROM users
      WHERE user_email = $1
      AND password = $2;`, values)
      .then(data => {
        res.cookie('user_name', user_email);
        console.log("rows", data.rows[0]);
        res.redirect('/stories');
      })
      .catch(err => {
        console.log(err.message);
        res.sendStatus(403);
      });
    }
  });
  return router;
};