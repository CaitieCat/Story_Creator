/*
 * All routes for logout are defined here
 * Since this file is loaded in server.js into /logout
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const values = [user_email, user_password];
    
    db.query(`SELECT user_name, profile_pic_path
    FROM users
    WHERE user_email = $1
    AND user_password = $2;`, values)
    .then(data => {
      const users = data.rows;
      console.log(users);
      res.json({ users });
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });

  return router;
};