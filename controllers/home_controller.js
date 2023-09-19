const Student = require("../models/student");

module.exports.home = async function (req, res) {
  const data = await Student.find({});
  return res.render("home", {
    title: "Home Page",
    student_list: data,
  });
};
module.exports.studentForm = function (req, res) {
  return res.render("create_student", {
    title: "Create Student",
  });
};

module.exports.studentInfo = function (req, res) {
  return res.render("student_info", {
    title: "Student Info",
  });
};
module.exports.interviewInfo = function (req, res) {
  return res.render("interview_info", {
    title: "Interviews Info",
  });
};

module.exports.createStudent = async function (req, res) {
  const newStudent = await Student.create(req.body);
  res.redirect("/");
};
