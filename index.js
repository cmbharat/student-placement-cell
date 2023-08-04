const express = require("express");
const port = 8000;
const path = require("path");

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var studentList = [
  { name: "bharat", age: 32, gender: "male" },
  { name: "keshav", age: 30, gender: "male" },
  { name: "giri", age: 29, gender: "female" },
  { name: "rajesh", age: 28, gender: "female" },
];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  return res.render("home", {
    title: "Landing Page",
    student_list: studentList,
  });
});

app.get("/practice", (req, res) => {
  return res.render("practice", {
    title: "practice Page",
  });
});

app.post("/create-student", function (req, res) {
  console.log(req.body);
});

app.listen(port, (err) => {
  if (err) {
    console.log("error===>", err);
  }
});
