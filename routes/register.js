// All routes for registration defined here
// Loaded into server.js into /registration

const express = require("express");
const router = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("register");
  });

  // registers a new user to the database

  router.post("/", (req, res) => {
    const user_name = req.body.user_name;
    const user_email = req.body.email;
    const user_password = req.body.password
    const profile_pic = req.body.user_pic;
    const values = [user_name, user_email, user_password, "http"];
    console.log("values", values);

    db.query(
      `INSERT INTO users (user_name, user_email, password, profile_pic_path)
        VALUES ($1, $2, $3, $4)`,
      values
    )
      .then((data) => {
        console.log("Post register", res.data);
        res.redirect("/stories");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  
  return router;
};
