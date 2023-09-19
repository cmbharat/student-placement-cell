const express = require("express");
const cookieParser = require("cookie-parser");
const port = 8000;
const path = require("path");
const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const expressLayouts = require("express-ejs-layouts");
const MongoStore = require("connect-mongo");

const app = express();
const bodyParser = require("body-parser");

// app.use((req, res, next) => {
//   console.log("midddle1 ware called");
//   next();
// });
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static("./assets"));
app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
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

app.use(
  session({
    //name of the cookie
    name: "codeial",
    //key to encode or decode the cookie
    //todo change the secret before the deployment in prod mode
    secret: "something",
    //when session is not initialized since user has not yet logged in we don't want to store any data in session cookie
    saveUninitialized: false,
    //resave the data in session cookie even when the session cookie has not changed
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongoUrl: "mongodb://localhost/students_list_db",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//use express router
app.use("/", require("./routes"));

app.use(express.static("assets"));

// app.get("/", async (req, res) => {
//   const data = await Student.find({});

//   return res.render("home", {
//     title: "Landing Page",
//     student_list: data,
//   });
// });

// app.get("/login", async (req, res) => {
//   return res.render("login", {
//     title: "Login Page",
//     // message: "loginMessage",
//   });
// });

// app.get("/practice", (req, res) => {
//   return res.render("practice", {
//     title: "practice Page",
//   });
// });

// app.get("/test", (req, res) => {
//   return res.render("user_profile", {
//     title: "user profile",
//   });
// });

/*String params*/
// app.get("/delete-student/:age", function (req, res) {
//   let age = req.params.age;
//   console.log(req.params);
//   res.redirect("/");
// });

/*Query params*/
// app.get("/delete-student/", async function (req, res) {
//   //   let age = req.params.age;
//   // console.log(req.query);
//   // let studentIndex = studentList.findIndex(
//   //   (student) => student.phone == req.query.id
//   // );
//   let id = req.query.id;
//   console.log(id);
//   let studentIndex = await Student.findByIdAndDelete(id);
//   if ((studentIndex = -1)) {
//     console.log(studentIndex);
//     return;
//   }
//   res.redirect("/");
// });

app.listen(port, (err) => {
  if (err) {
    console.log("error===>", err);
  }
});
