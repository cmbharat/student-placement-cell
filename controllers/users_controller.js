const User = require("../models/user");

module.exports.signin = function (req, res) {
  return res.render("sign_in", {
    title: "Sign In",
  });
};
module.exports.signup = function (req, res) {
  return res.render("sign_up", {
    title: "Sign Up",
  });
};
module.exports.create = async function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    const newUser = await User.create(req.body);
    console.log("user new");
    return res.redirect("/users/signin");
  } else {
    console.log("user existing");
    return res.redirect("back");
  }
  // User.findOne(
  //   {
  //     email: req.body.email,
  //   },
  //   (err, user) => {
  //     if (err) {
  //       console.log("error in finding the user ", user);
  //       return;
  //     }
  //     // when user is not found
  //     if (!user) {
  //       User.create(req.body, function (err, user) {
  //         if (err) {
  //           console.log("error in creating user while signing up");
  //           return;
  //         }
  //         return res.redirect("/users/signin");
  //       });
  //     }
  //   }
  // );
};
