const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");
const env = require("./environment");

//tell passport to use the  new strategy for google login
passport.use(
  new GoogleStrategy(
    {
      clientID: env.google_clientID,
      clientSecret: env.google_clientSecret,
      callbackURL: env.google_callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      //find a user
      const user = await User.findOne({
        email: profile.emails[0].value,
      });

      if (user) {
        return done(null, user);
      } else {
        //if user not found ,create the  user and set it as req.user
        const user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: crypto.randomBytes(20).toString("hex"),
        });
        return done(null, user);
      }
    }
  )
);

module.exports = passport;
