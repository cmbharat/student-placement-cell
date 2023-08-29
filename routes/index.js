const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");

console.log("router loaded");

router.get("/", homeController.home);

router.get("/login", function (req, res) {
  res.render("login", {
    title: "Login Page",
    message: "loginMessage",
  });
});

module.exports = router;
