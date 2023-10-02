const Company = require("../models/company");
const Student = require("../models/student");

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
  return res.render("company_detail", {
    title: "Company Details",
    students: students,
    companyData: companyData,
  });
};

module.exports.scheduleInterview = async function (req, res) {
  const { id, student_id, company, date } = req.body;
  console.log("req.body===>", req.body);
  try {
    const existingCompany = await Company.findOne({ name: company });
    const obj = {
      student: student_id,
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
        if (student.student.toString() === student_id) {
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
      for (let interview of student.interviews) {
        // if student id already exists
        if (interview.company === company) {
          console.log("Interview with this company already scheduled");
          return res.redirect("back");
        }
      }
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

module.exports.updateStatus = async function (req, res) {
  const { id } = req.params;
  const { companyName, companyResult } = req.body;
  try {
    const student = await Student.findById(id);
    if (student && student.interviews.length > 0) {
      for (let company of student.interviews) {
        if (company.company === companyName) {
          company.result = companyResult;
          student.save();
          break;
        }
      }
    }

    const company = await Company.findOne({ name: companyName });
    if (company) {
      for (let std of company.students) {
        /// compare student id and id passed in params
        if (std.student.toString() === id) {
          std.result = companyResult;
          company.save();
        }
      }
    }
    console.log("Interview Status Changed Successfully");
    return res.redirect("/company/company-list");
  } catch (error) {
    console.log(`Error in updating status: ${error}`);
    res.redirect("back");
  }
};

module.exports.deleteCompany = async function (req, res) {
  console.log("inside deletcompany");
  const id = req.query.id;
  const company = await Company.findById(id);
  // const students = await Student.find({});

  await Student.updateMany(
    {},
    {
      $pull: {
        interviews: {
          company: company.name,
        },
      },
    },
    { multi: true }
  );

  // for (let student of students) {
  //   if (student && student.interviews.length > 0) {
  //     let filteredInterview = student.interviews.filter(
  //       (interview) => interview.company != company.name
  //     );
  //     student.interviews = filteredInterview;
  //     student.save();
  //     // break;
  //   }
  // }

  await Company.findByIdAndDelete(id);
  // Company.save();
  res.redirect("back");
};
