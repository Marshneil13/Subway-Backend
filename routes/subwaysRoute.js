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

router.post("/addsubway", async (req, res) => {
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

router.post("/getsubwaybyid", async (req, res) => {
  const subwayId = req.body.subwayId;
  try {
    const subway = await Subway.findOne({ _id: subwayId });
    res.send(subway);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/editsubway", async (req, res) => {
  const editedSubway = req.body.editedSubway;
  try {
    const subway = await Subway.findOne({ _id: editedSubway._id });
    subway.name = editedSubway.name;
    subway.description = editedSubway.description;
    subway.image = editedSubway.image;
    subway.category = editedSubway.category;
    subway.prices = [editedSubway.prices];

    await subway.save();
    res.send("Subway details updated successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
