// All routes for registration defined here
// Loaded into server.js into /registration

const express = require('express');
const router  = express.Router();




module.exports = (db) => {
    router.get("/", (req, res) => {
        const query =  (`SELECT id, user_name FROM users`);
        const results = db.query(query);

        results.then(res => {
        console.log(res.rows);
        //console.log("hi");
        })
        .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
        })
        console.log(query);
        res.render("register");
    });

    router.post("/", (req, res) => {
        console.log("Post request to register");
       /* const user_name = req.body.user_name;
        const user_email = req.body.user_email;
        const user_password = req.body.user_password;
        const values = [user_name, user_email, user_password];
        
        db.query(`INSERT INTO users
        VALUES ($1, $2, $3)` , values)
        .then(data => {
        console.log(res.data);
        })
        .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
        });*/
    });
  return router;
};