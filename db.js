const mongoose = require("mongoose");
var mongoURL =
  "mongodb+srv://marshneil_13:THEgolferno1**@subwaycluster.ikdbrfd.mongodb.net/sandy-subway";

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });
// mongoose.set("strictQuery", true);
var db = mongoose.connection;
db.on("connected", () => {
  console.log(`MongoDB Connection Successful`);
});

db.on("error", () => {
  console.log(`MongoDB Connection Failed`);
});

module.exports = mongoose;
