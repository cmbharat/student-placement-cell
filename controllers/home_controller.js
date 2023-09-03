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
module.exports.createStudent = async function (req, res) {
  const newStudent = await Student.create({
    name: req.body.name,
    phone: req.body.phone,
  });
  res.redirect("/");
};
