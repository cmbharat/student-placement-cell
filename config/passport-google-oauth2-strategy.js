const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

//tell passport to use the  new strategy for google login
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "963091267993-sp7ghubbue8j5h1uds8l5se90ndr4ofg.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      //find a user
      const user = await User.findOne({
        email: profile.emails[0].value,
      });

      console.log("profile====>", profile);
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
