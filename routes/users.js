const express = require("express");
const router = express.Router();
const userController = require("../controllers/users_controller");

router.get("/signin", userController.signin);

router.get("/signup", userController.signup);

router.post("/create", userController.create);

router.get("/profile", userController.userInfo);
module.exports = router;
