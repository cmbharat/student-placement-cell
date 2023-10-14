require("dotenv").config();
const express = require("express");
const env = require("./config/environment");
const cookieParser = require("cookie-parser");
const port = 8000;
const path = require("path");
const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");
const expressLayouts = require("express-ejs-layouts");
const MongoStore = require("connect-mongo");

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static(env.asset_path));
app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    //name of the cookie
    name: "codeial",
    //key to encode or decode the cookie
    //todo change the secret before the deployment in prod mode
    secret: env.session_cookie,
    //when session is not initialized since user has not yet logged in we don't want to store any data in session cookie
    saveUninitialized: false,
    //resave the data in session cookie even when the session cookie has not changed
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongoUrl: "mongodb+srv://bharatcm70:SlheH9yShhJq6mtE@cluster0.3galhli.mongodb.net/?retryWrites=true&w=majority",
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

app.listen(port, (err) => {
  if (err) {
    console.log("error===>", err);
  }
});
