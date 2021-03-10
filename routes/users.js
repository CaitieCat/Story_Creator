/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

// const express = require('express');
// const router  = express.Router();

// module.exports = (db) => {
//   router.get("/", (req, res) => {
//     db.query(`SELECT * FROM users;`)
//       .then(data => {
//         const users = data.rows;
//         res.json({ users });
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });
//   return router;
// };

// router.post("/", (req, res) => {
//   if (!req.body.text) {
//     res.status(400).json({ error: 'invalid request: no data in POST body'});
//     return;
//   } else {
//     const user = req.body.user
//     return router;
//   }
// }
 
  

/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

// const express = require('express');
// const router  = express.Router();
// module.exports = (db) => {
  
  /*router.get("/", (req, res) => {
    res.render("register");
    db.query(`SELECT * FROM users`)
    .then(data => {
      const users = data.rows;
      console.log(data);

  /*router.get("/", (req, res) => {
    const user_email = req.body.user_email;
    const password = req.body.user_password;
    const values = ['alice@alice.com', 'password'];
    
    db.query(`SELECT user_name, profile_pic_path
    FROM users
    WHERE user_email = $1
    AND password = $2;`, values)
    .then(data => {
      const users = data.rows[0];
      console.log(users);
      res.json({ users });
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });*/

  //return router;
// };
