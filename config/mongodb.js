const mongoose = require("mongoose");
const config = require("./config");
const {
  db: { host, port, name },
} = config;
mongoose.Promise = global.Promise;
const connectionString = `mongodb://${host}:${port}/${name}`;
mongoose.connect(connectionString, {});
var db = mongoose.connection;
db.once("open", function callback() {
  console.log("Database connection to MongoDB opened.");
});
db.on("connected", function () {
  console.info("MongoDB event connected");
});
db.on("disconnected", function () {
  console.warn("MongoDB event disconnected");
});
db.on("reconnected", function () {
  console.info("MongoDB event reconnected");
});
db.on("error", function (err) {
  console.error("connection error:" + err);
});
console.log("Loading MongoDB Settings ...");

module.exports = mongoose;
