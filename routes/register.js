// All routes for registration defined here
// Loaded into server.js into /registration

const express = require('express');
const router  = express.Router();




module.exports = (db) => {
    router.get("/", (req, res) => {
        const query =  (`SELECT id, user_name FROM users`);
        const results = db.query(query);
        console.log("hi");
    
        results.then(res => {
        console.log(res.rows);
        })
        .catch(err => {
         console.log("catch");   
        res
        .status(500)
        .json({ error: err.message });
        })
        res.render("register");
    });

    router.post("/", (req, res) => {
        console.log("Post request to register");
        const user_name = req.body.user_name;
        const user_email = req.body.user_email;
        const user_password = req.body.user_password;
        const profile_pic = req.body.user_pic;
        const values = [user_name, user_email, user_password, profile_pic];
        
        db.query(`INSERT INTO users (user_name, user_email, password, profile_pic_path)
        VALUES ($1, $2, $3, $4)` , values)
        .then(data => {
        console.log(res.data);
        })
        .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
        });
    });
  return router;
};