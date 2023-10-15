const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student_controller");
const passport = require("passport");

router.get(
  "/student-form",
  passport.checkAuthentication,
  studentController.studentForm
);
router.post(
  "/create-student",
  passport.checkAuthentication,
  studentController.createStudent
);
router.get(
  "/studentinfo",
  passport.checkAuthentication,
  studentController.studentInfo
);
router.get(
  "/delete-student",
  passport.checkAuthentication,
  studentController.deleteStudent
);
router.get(
  "/student-form",
  passport.checkAuthentication,
  studentController.studentForm
);
router.post(
  "/create-student",
  passport.checkAuthentication,
  studentController.createStudent
);
router.post(
  "/update-student",
  passport.checkAuthentication,
  studentController.updateStudent
);

module.exports = router;
