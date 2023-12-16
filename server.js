const dotenv = require("dotenv").config(); //module that we will use to access environment variables in our application.
const express = require("express");
const db = require("./db.js");
const app = express();
const Subway = require("./models/subwayModel");
const subwaysRoute = require("./routes/subwaysRoute");
const userRoute = require("./routes/userRoute");
const ordersRoute = require("./routes/ordersRoute");
const cartRoute = require("./routes/cartRoute.js");
const cors = require("cors");

app.use(express.json());

app.use(cors());

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/../", "build", "index.html"));
// });

app.use("/api/subways/", subwaysRoute);
app.use("/api/users/", userRoute);
app.use("/api/orders/", ordersRoute);
app.use("/api/cart/", cartRoute);
app.get("/", (req, res) => {
  res.send("Server is Working");
});

const port = process.env.PORT || 5000;
app.listen(port, () => `Server is running on port ${port}`);

//Get data from te backend through redux and redux thunk
// Redux thunk is the middleware used to perform the asynchronous operations i.e. API operations
