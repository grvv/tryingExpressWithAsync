// https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/

const express = require("express");
const bodyParser = require("body-parser");
// https://stackoverflow.com/questions/38306569/what-does-body-parser-do-with-express

// Configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// We create an express app, and add two body-parser middlewares using express’s app.use() method. A middleware is a function that has access to the request and response objects. It can execute any code, transform the request object, or return a response.

// define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Testing Pagination" });
});

// listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

// Require Posts routes
require("./routes/post.routes.js")(app);

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });
