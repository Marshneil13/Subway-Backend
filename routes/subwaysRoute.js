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

router.post("/addsubways", async (req, res) => {
  const subway = req.body.subway;

  try {
    const newSubway = new Subway({
      name: subway.name,
      varients: ["six inch", "foot-long"],
      prices: [subway.prices],
      category: subway.category,
      description: subway.description,
      image: subway.image,
      icon: subway.icon,
    });
    await newSubway.save();
    res.send("New Sub added Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
