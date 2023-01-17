const express = require("express");
const router = express.Router();

const User = require("../models/userModel");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await new User({ name, email, password });

  try {
    newUser.save();
    res.send("User Registered Successfully!");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

// Whenever a login is successful, we have to send the user data from the backend to the frontend as it has to be stored in the local storage of the console

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.find({ email, password });
    if (user.length > 0) {
      const currentUSer = {
        name: user[0].name,
        email: user[0].email,
        isAdmin: user[0].isAdmin,
        _id: user[0]._id,
      };
      res.send(currentUSer);
    } else {
      return res.status(400).json({ message: "User login failed" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
