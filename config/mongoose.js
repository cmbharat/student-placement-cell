const env = require("./environment");
const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection.error"));
db.once("open", function () {
  console.log(process.env.CODEIAL_ENVIRONMENT);
  console.log("connected to the db");
});
