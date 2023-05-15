const express = require("express");
const dotenv = require("dotenv");
const secretKey = process.env.REACT_APP_SECRET_KEY;
const Stripe = require("stripe")(secretKey);
// console.log("STRIPE", Stripe);
const Order = require("../models/orderModel");
const router = express.Router();
const { v4: uuid4 } = require("uuid");

router.post("/placeorder", async (req, res) => {
  const { subtotal, name, address, city, pincode, currentUser, cartItems } =
    req.body;
  // token gives the shipping address card number etc.
  try {
    const newOrder = new Order({
      name: name,
      email: currentUser.email,
      userId: currentUser._id,
      orderItems: cartItems,
      orderAmount: subtotal,
      shippingAddress: {
        street: address,
        city: city,
        country: "India",
        pincode: pincode,
      },
      paymentStatus: "pending",
    });
    newOrder.save();
    res.send("Order Placed Successfully!");
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something went wrong", error: error });
  }
});

router.post("/getuserorders", async (req, res) => {
  const { userId } = req.body;
  try {
    const orders = await Order.find({ userId: userId }).sort({ _id: -1 }); //by doing so the items will get sorted date wise instead of id
    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
});

router.get("/getallorders", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.send(orders);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/deliverorder", async (req, res) => {
  const orderId = req.body.orderId;
  try {
    const order = await Order.findOne({ _id: orderId });
    order.isDelivered = true;
    order.paymentStatus = "received";
    await order.save();
    res.send("Order Delivered Successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
