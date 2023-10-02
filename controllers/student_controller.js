const Company = require("../models/company");
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

module.exports.interviewInfo = function (req, res) {
  return res.render("interview_info", {
    title: "Interviews Info",
  });
};

module.exports.createStudent = async function (req, res) {
  const newStudent = await Student.create(req.body);
  res.redirect("/");
};

module.exports.deleteStudent = async function (req, res) {
  const id = req.query.id;

  await Company.updateMany(
    {},
    {
      $pull: {
        students: { student: id },
      },
    },
    { multi: true }
  );
  // const companies = await Company.find({});

  // for (let company of companies) {
  //   if (company && company.students.length > 0) {
  //     const filteredStudents = company.students.filter(
  //       (student) => student.student != id
  //     );
  //     company.students = filteredStudents;
  //     company.save();
  //   }
  // }
  await Student.findByIdAndDelete(id);
  res.redirect("/");
};

module.exports.studentInfo = async function (req, res) {
  const id = req.query.id;
  const data = await Student.findById(id);

  if (data) {
    return res.render("student_info", {
      title: "Student Info",
      studentData: data,
    });
  }
  return res.redirect("back");
};

module.exports.updateStudent = async function (req, res) {
  console.log("inside update", req.body);
  const {
    id,
    name,
    batch,
    college,
    status,
    dsa_score,
    webdev_score,
    react_score,
  } = req.body;
  await Student.findByIdAndUpdate(id, {
    name,
    batch,
    college,
    status,
    dsa_score,
    webdev_score,
    react_score,
  });
  return res.redirect("/");
};
