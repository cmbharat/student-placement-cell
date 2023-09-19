const Company = require("../models/company");
const Student = require("../models/student");

// module.exports.create = function (req, res) {
//   return res.render("create_company", {
//     title: "Create Company",
//   });
// };
module.exports.companiesList = async function (req, res) {
  const data = await Company.find({});
  return res.render("companies_list", {
    title: "Companies",
    company_list: data,
  });
};

module.exports.createCompany = async function (req, res) {
  // console.log("inside createcompany===>", req.body);
  const newCompany = await Company.create({
    name: req.body.name,
    interviewDate: req.body.interviewDate,
  });
  res.redirect("/company/company-list");
};
module.exports.companyInfo = async function (req, res) {
  const data = await Student.find({});
  let id = req.query.id;
  const companyData = await Company.findById(id);
  return res.render("company_info", {
    title: "Company Info",
    students: data,
    companyData: companyData,
  });
};

module.exports.companydetails = async function (req, res) {
  let id = req.query.id;
  const companyData = await Company.findById(id);
  const students = await Student.find({});
  console.log("companyData===>", companyData);
  return res.render("company_detail", {
    title: "Company Details",
    students: students,
    companyData: companyData,
  });
};

module.exports.scheduleInterview = async function (req, res) {
  const { id, student_id, company, date } = req.body;

  try {
    const existingCompany = await Company.findOne({ name: company });
    const obj = {
      student: id,
      date,
      result: "Pending",
    };
    // if company doesnt exist
    if (!existingCompany) {
      const newCompany = await Company.create({
        name: company,
      });
      newCompany.students.push(obj);
      newCompany.save();
    } else {
      for (let student of existingCompany.students) {
        // if student id already exists
        if (student.student._id === student_id) {
          console.log("Interview with this student already scheduled");
          return res.redirect("back");
        }
      }
      existingCompany.students.push(obj);
      existingCompany.save();
    }

    const student = await Student.findById(student_id);

    if (student) {
      const interview = {
        company,
        date,
        result: "Pending",
      };
      student.interviews.push(interview);
      student.save();
    }
    console.log("Interview Scheduled Successfully");
    return res.redirect("/company/company-list");
  } catch (error) {
    console.log(`Error in scheduling Interview: ${error}`);
    return res.redirect("back");
  }
};
