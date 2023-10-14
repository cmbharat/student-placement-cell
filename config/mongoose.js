const env = require("./environment");
const mongoose = require("mongoose");

mongoose.connect(`mongodb+srv://bharatcm70:SlheH9yShhJq6mtE@cluster0.3galhli.mongodb.net/?retryWrites=true&w=majority`);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection.error"));
db.once("open", function () {
  console.log("connected to the db");
});
