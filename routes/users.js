const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/users_controller");

router.get("/signin", userController.signin);
router.get("/signup", userController.signup);

router.post("/create", userController.create);

//use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", {
    failureRedirect: "/users/signin",
  }),
  userController.createSession
);
router.get("/signout", userController.destroySession);
router.get("/profile", passport.checkAuthentication, userController.profile);
module.exports = router;
