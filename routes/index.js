const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");

console.log("router loaded");

router.get("/", homeController.home);
router.get("/student-form", homeController.studentForm);
router.post("/create-student", homeController.createStudent);
router.use("/users", require("./users"));

module.exports = router;
