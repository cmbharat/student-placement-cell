const Student = require("../models/student");
const User = require("../models/user");
// const fs = require("fs");
const { Parser } = require("json2csv");
const fs = require("@cyclic.sh/s3fs");
const AWS = require("aws-sdk");
const s3 = new AWS.S3();

module.exports.signin = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("sign_in", {
    title: "Sign In",
  });
};
module.exports.signup = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("sign_up", {
    title: "Sign Up",
  });
};

module.exports.create = async function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    const newUser = await User.create(req.body);
    return res.redirect("/users/signin");
  } else {
    return res.redirect("back");
  }
};

//sign in and create a session for the user
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

//sign out
module.exports.destroySession = function (req, res, next) {
  //function provided by passport
  req.logout(function (err) {
    if (err) {
      console.log("erorr===", err);
      return next(err);
    } else res.redirect("/users/signin");
  });
  // return res.redirect("/users/signin");
};

// download report
module.exports.downloadCsv = async function (req, res) {
  try {
    const students = await Student.find({});

    // const json2csvParser = new Parser();
    // const csvData = json2csvParser.parse(students);

    // console.log("students===>", csvData);
    let data = "";
    let no = 1;
    let csv =
      "S.No, Name, College, Status, Batch, DSA Score, WebDev Score, React Score, Interview, Date, Result";

    for (let student of students) {
      if (student.interviews.length > 0) {
        for (let interview of student.interviews) {
          data =
            no +
            "," +
            student.name +
            "," +
            student.college +
            "," +
            student.status +
            "," +
            student.batch +
            "," +
            student.dsa_score +
            "," +
            student.webdev_score +
            "," +
            student.react_score;

          data +=
            "," +
            interview.company +
            "," +
            interview.date.toString() +
            "," +
            interview.result;

          no++;
          csv += "\n" + data;
        }
      }
    }

    // const dataFile = fs.writeFile(
    //   "report/data.csv",
    //   csv,
    //   function (error, data) {
    //     if (error) {
    //       console.log(error);
    //       return res.redirect("back");
    //     }
    //     console.log("Report generated successfully");
    //     return res.download("report/data.csv");
    //   }
    // );

    console.log(typeof csv);

    try {
      await s3.putObject(
        {
          Body: csv,
          Bucket: process.env.BUCKET,
          Key: "data.csv",
          ContentType: "text/csv",
        },
        (err, data) => {
          if (err) {
            console.error("error in uploading csv", err);
          } else {
            console.log("csv file uploaded to s3");
          }
        }
      );
    } catch (error) {
      console.log("error in set===>", error);
    }

    try {
      const params = {
        Bucket: process.env.BUCKET,
        Key: "data.csv",
      };

      s3.getObject(params, (err, data) => {
        if (err) {
          console.error("erorr dowloading csv", err);
        } else {
          const csvContent = data.Body.toString();
          console.log("CSV Data:==>", csvContent);
          // fs.writeFileSync("data.csv", csvContent);

          //  return res.send(s3File.Body.toString()).end();

          res.set("Content-type", csvContent.ContentType);
          res.send(csvContent).end();
        }
      });
    } catch (error) {}
  } catch (error) {
    console.log(`Error in downloading file: ${error}`);
    return res.redirect("back");
  }
};
