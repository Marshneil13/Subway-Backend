const dotenv = require("dotenv").config(); //module that we will use to access environment variables in our application.
const express = require("express");
const db = require("./db.js");
const app = express();
const Subway = require("./models/subwayModel");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is Working");
});

app.get("/getsubways", (req, res) => {
  Subway.find({}, (err, docs) => {
    if (err) {
      console.log("ERROR", err);
    } else {
      res.send(docs);
    }
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => `Server is running on port ${port}`);

//Get data from te backend through redux and redux thunk
// Redux thunk is the middleware used to perform the asynchronous operations i.e. API operations
