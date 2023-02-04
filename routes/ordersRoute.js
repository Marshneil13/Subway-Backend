const express = require("express");
const dotenv = require("dotenv");
const secretKey = process.env.SECRET_KEY;
const { default: Stripe } = require("stripe")(secretKey);
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
    const payment = await Stripe.charges.create(
      {
        amount: subtotal * 100, //as the amount is in paise
        currency: "inr",
        customer: customer.id,
        receit_email: token.email, //payment confirmation is sent to the receit email
      },
      {
        idempotencyKey: uuidv4(), //so that the customer is not charged twice for the same order
      }
    );
  } catch (error) {}
});

module.exports = router;
