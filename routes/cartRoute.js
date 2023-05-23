const express = require("express");
const router = express.Router();
const Cart = require("../models/cartModel");

router.post("/getusercart", async (req, res) => {
  const { userEmail } = req.body;

  try {
    const cart = await Cart.findOne({ email: userEmail });
    if (cart) {
      const cartItems = cart.cartItems;
      res.send(cartItems);
    } else {
      return res.status(400).json({ message: "Unable to fetch Cart" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/updateusercart", async (req, res) => {
  const { cartItems, userEmail } = req.body;

  try {
    const cart = await Cart.findOne({ email: userEmail });
    if (cart) {
      cart.cartItems = cartItems;
      await cart.save();
      res.json({message: "Updated cart!"})
    } else {
      return res.status(400).json({ message: "Couldn't update user cart" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
