const express = require("express");
const router = express.Router();

const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { log } = require("console");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  try {
    if (!userExists) {
      const salt = await bcrypt.genSalt(10);
      const securedPassword = await bcrypt.hash(password, salt);
      const newUser = await new User({
        name: name,
        email: email,
        password: securedPassword,
      });
      const newUserCart = await new Cart({ name, email });
      newUser.save();
      newUserCart.save();
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
    const user = await User.findOne({ email });
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        const currentUser = {
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          _id: user._id,
        };
        const userCart = await Cart.findOne({ email: email });
        res.json({ currentUser: currentUser, cartItems: userCart.cartItems });
      } else {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
    } else {
      return res.status(400).json({ message: "Invalid Credentials" });
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
module.exports = router;
