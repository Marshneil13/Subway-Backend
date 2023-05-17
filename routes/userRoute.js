const express = require("express");
const router = express.Router();

const User = require("../models/userModel");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  try {
    if (!userExists) {
      const newUser = await new User({ name, email, password });
      newUser.save();
      res.send("User Registered Successfully!");
    } else {
      res.status(400);
      throw new Error("Email already exists");
    }
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
      const currentUser = {
        name: user[0].name,
        email: user[0].email,
        isAdmin: user[0].isAdmin,
        _id: user[0]._id,
        cart: user[0].cart,
      };
      res.send(currentUser);
    } else {
      return res.status(400).json({ message: "User login failed" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/deleteuser", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findOneAndDelete({ _id: userId });
    res.send("User deleted successfully");
  } catch (error) {
    return res.status(400).json({ message: "Failed to delete user" });
  }
});

router.post("/updateusercart", async (req, res) => {
  const cartItems = req.body.cartItems;
  const userId = req.body.userId;
  try {
    const user = await User.findOne({ _id: userId });
    user.cart = cartItems;
    await user.save();
    res.send("User cart updated successfully");
  } catch (error) {
    return res.status(400).json({ message: "Failed to update user cart" });
  }
});

router.post("/getusercart/:userid", async (req, res) => {
  const userId = req.params["userid"];
  try {
    const user = await User.findOne({ _id: userId });
    res.send(user.cart);
  } catch (error) {
    return res.status(400).json({ message: "Unable to fetch user cart" });
  }
});

module.exports = router;
