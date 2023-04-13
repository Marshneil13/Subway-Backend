const express = require("express");
const dotenv = require("dotenv");
const secretKey = process.env.REACT_APP_SECRET_KEY;
const Stripe = require("stripe")(secretKey);
console.log("STRIPE", Stripe);
const Order = require("../models/orderModel");
const router = express.Router();
const { v4: uuid4 } = require("uuid");

router.post("/placeorder", async (req, res) => {
  const { token, subtotal, currentUser, cartItems } = req.body;
  // token gives the shipping address card number etc.
  try {
    const customer = await Stripe.customers.create({
      email: token.email,
      source: token.id, //through the token id we send all payment details to the source
    });
    console.log("CUSTOMER", customer);
    const payment = await Stripe.charges.create(
      {
        amount: subtotal * 100, //as the amount is in paise
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email, //payment confirmation is sent to the receit email
      },
      {
        idempotencyKey: uuidv4(), //so that the customer is not charged twice for the same order
      }
    );
    if (payment) {
      const neworder = new Order({
        name: currentUser.name,
        email: currentUser.email,
        userId: currentUser._id,
        orderItems: cartItems,
        orderAmount: subtotal,
        shippingAddress: {
          street: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          pincode: token.card.address_zip,
        },
        transactionId: payment.source.id,
      });
      neworder.save();
      res.send("Order Placed Successfully!");
    } else {
      res.send("Payment Failed");
    }
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

module.exports = router;
