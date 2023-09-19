const User = require("../models/user");

module.exports.signin = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("sign_in", {
    title: "Sign In",
  });
};
module.exports.signup = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("sign_up", {
    title: "Sign Up",
  });
};
// module.exports.userInfo = function (req, res) {
//   return res.render("user_profile", {
//     title: "User Profile",
//   });
// };

module.exports.profile = async function (req, res) {
  // console.log("inside profile");
  // if (req.cookies.codeial) {
  //   var user = await User.findById(req.cookies.codeial);
  //   // console.log("req.cookies.user_id=======>", req.cookies.user_id);
  //   // console.log("user====", user.name);
  //   if (user) {
  return res.render("user_profile", {
    title: "User Profile",
    // user: user,
  });
  // }
  //   return res.redirect("/users/signin");
  // } else {
  //   return res.redirect("/users/signin");
  // }
};

module.exports.create = async function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    const newUser = await User.create(req.body);
    return res.redirect("/users/signin");
  } else {
    return res.redirect("back");
  }
};

//sign in and create a session for the user
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

//sign out
module.exports.destroySession = function (req, res, next) {
  //function provided by passport
  req.logout(function (err) {
    if (err) {
      console.log("erorr===", err);
      return next(err);
    } else res.redirect("/users/signin");
  });
  // return res.redirect("/users/signin");
};
