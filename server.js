// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieParser = require('cookie-parser');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
// console.log(dbParams);
db.connect();
db.on("error", (err) =>{
  console.log("Error message: ", err);
});

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true})); // This will help in encoding.
// this will support json format
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static("public"));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

// Separated Routes for each Resource
const usersRoutes = require("./routes/users");
const storiesRoutes = require("./routes/stories");
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(db));
// Note: mount other resources here, using the same pattern above
app.use("/stories", storiesRoutes(db));
app.use("/register", registerRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/logout", logoutRoutes());


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  const user_id = req.cookies['user_id'];
  tempVar = {user_id};
  if (user_id){
    const values = [user_id];
    db.query(`SELECT * FROM USERS WHERE id = $1`, values)
    .then((data)=>{
      const user_name = data.rows[0]['user_name'];
      tempVar.user_name = user_name;
      res.render("index", tempVar);
    })
  } else {
    res.render("index", tempVar);
  }

});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
