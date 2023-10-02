const express = require("express");
const router = express.Router();
const homeController = require("../controllers/student_controller");

console.log("router loaded");

router.get("/", homeController.home);
router.use("/users", require("./users"));
router.use("/company", require("./company"));
router.use("/student", require("./student"));
module.exports = router;
