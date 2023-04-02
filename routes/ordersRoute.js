const express = require("express");
const dotenv = require("dotenv");
const secretKey = process.env.REACT_APP_SECRET_KEY;
const Stripe = require("stripe")(secretKey);
console.log("STRIPE", Stripe);
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
      console.log("Payment Done! Order Placed Successfully");
    } else {
      console.log("Payment Failed");
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something went wrong", error: error });
  }
});

module.exports = router;
