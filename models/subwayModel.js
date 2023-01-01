const mongoose = require("mongoose");
const subwaySchema = mongoose.Schema(
  {
    name: { type: String, require },
    varients: [],
    prices: [],
    category: { type: String, require },
    description: { type: String, require },
    image: { type: String, require },
    icon: { type: String, require },
  },
  {
    timestamps: true,
  }
);

const subwayModel = mongoose.model("subways", subwaySchema);

module.exports = subwayModel;
