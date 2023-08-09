const express = require("express");
const port = 8000;
const path = require("path");
const db = require("./config/mongoose");
const Contact = require("./models/student");

const app = express();

var studentList = [
  { name: "bharat", phone: "8151007904" },
  { name: "sfsfc", phone: "8446413134" },
  { name: "sads", phone: "4478889956" },
  { name: "adewfgd", phone: "9785454454" },
];

const bodyParser = require("body-parser");

// app.use((req, res, next) => {
//   console.log("midddle1 ware called");
//   next();
// });
app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   console.log("midddle2 ware called");
//   next();
// });

// app.use((req, res, next) => {
//   console.log("midddle3 ware called");
//   next();
// });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("assets"));

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

app.post("/create-student", async function (req, res) {
  //   console.log(req.body);
  //   studentList.push({
  //     name: req.body.name,
  //     phone: req.body.phone,
  //   });

  const newStudent = await Contact.create({
    name: req.body.name,
    phone: req.body.phone,
    // },
    // function (err, newStudent) {
    //   if (err) {
    //     console.log("error in creating a contacts");
    //     return;
    //   }
    //   console.log("newStudent===>", newStudent);

    //   res.redirect("/");
  });

  console.log("newStudent===>", newStudent);

  res.redirect("/");
});

/*String params*/
// app.get("/delete-student/:age", function (req, res) {
//   let age = req.params.age;
//   console.log(req.params);
//   res.redirect("/");
// });

/*Query params*/
app.get("/delete-student/", function (req, res) {
  //   let age = req.params.age;
  console.log(req.query);
  let studentIndex = studentList.findIndex(
    (student) => student.phone == req.query.phone
  );
  if (studentIndex != -1) studentList.splice(studentIndex, 1);
  res.redirect("/");
});

app.listen(port, (err) => {
  if (err) {
    console.log("error===>", err);
  }
});
