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
const cookie = require('cookie');

//const cookieSession = require("cookie-session");

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
app.use(bodyParser.urlencoded({ extended: true }));


//app.use(bodyParser.urlencoded({ extended: true }));

// app.use(bodyParser.urlencoded({extended: true})); // This will help in encoding.
 // this will support json format

app.use(express.static("public")); 
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
//const usersRoutes = require("./routes/users");
const storiesRoutes = require("./routes/stories");
const registerRoutes = require("./routes/register");
const user_profileRoutes = require("./routes/user_profile");
const loginRoutes = require("./routes/login");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// app.use("/api/users", usersRoutes(db));

// Note: mount other resources here, using the same pattern above
app.use("/stories", storiesRoutes(db));
app.use("/register", registerRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/user_profile", user_profileRoutes(db));


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});




app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
