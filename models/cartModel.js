const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    name: { type: String, require },
    email: { type: String, require },
    cartItems: [],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cart", cartSchema);
