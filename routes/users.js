const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/users_controller");

router.get("/signin", userController.signin);
router.get("/signup", userController.signup);
router.get("/signout", userController.destroySession);
router.get(
  "/download-csv",
  passport.checkAuthentication,
  userController.downloadCsv
);
router.post("/create", userController.create);

//use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", {
    failureRedirect: "/users/signin",
  }),
  userController.createSession
);
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/signin" }),
  userController.createSession
);
module.exports = router;
