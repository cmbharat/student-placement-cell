const passport = require("passport");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;

//authentication using passport.js and return the user to serializeUser
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      const user = await User.findOne({ email: email });
      console.log("user===>", user);
      if (!user) {
        return done(null, false);
      }

      if (user.password != password) {
        return done(null, false);
      }

      return done(null, user);
    }
  )
);

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser((user, done) => {
  //passport identifies the user who signed in and stores encrypted userId into the cookie
  done(null, user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  console.log("user==== in deserial===>", user);
  if (user) {
    return done(null, user);
  }
});

//check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
  // console.log("inside checkAuthentication====>", req.isAuthenticated());

  if (req.isAuthenticated()) {
    // console.log("inside checkAuthentication====>", req.isAuthenticated());
    return next();
  }

  return res.redirect("/users/signin");
};

passport.setAuthenticatedUser = function (req, res, next) {
  console.log("inside setAuthenicatedUser");
  if (req.isAuthenticated()) {
    //req.user contains current signed in user from sessions cookie
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
