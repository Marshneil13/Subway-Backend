const mongoose = require("mongoose");
var mongoURI = process.env.MONGO_URI;

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`MongoDB Connection Successful`);
  })
  .catch((err) => {
    console.log(`MongoDB Connection Failed`);
  });

module.exports = mongoose;
