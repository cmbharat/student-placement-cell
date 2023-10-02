const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student_controller");

router.get("/student-form", studentController.studentForm);
router.post("/create-student", studentController.createStudent);
router.get("/studentinfo", studentController.studentInfo);
router.get("/delete-student", studentController.deleteStudent);
router.get("/student-form", studentController.studentForm);
router.post("/create-student", studentController.createStudent);
router.post("/update-student", studentController.updateStudent);

module.exports = router;
