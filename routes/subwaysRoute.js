// dispatching actions from the component to the store

const express = require("express");
const router = express.Router();
const Subway = require("../models/subwayModel");

router.get("/getallsubways", async (req, res) => {
  try {
    const subways = await Subway.find({});
    res.send(subways);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
