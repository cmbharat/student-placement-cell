const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company_controller");
const passport = require("passport");

router.get(
  "/company-list",
  passport.checkAuthentication,
  companyController.companiesList
);

router.post(
  "/add",
  passport.checkAuthentication,
  companyController.createCompany
);

router.get(
  "/companyinfo",
  passport.checkAuthentication,
  companyController.companyInfo
);

router.post(
  "/schedule-interview",
  passport.checkAuthentication,
  companyController.scheduleInterview
);

router.get(
  "/companydetails",
  passport.checkAuthentication,
  companyController.companydetails
);

router.post(
  "/update-status/:id",
  passport.checkAuthentication,
  companyController.updateStatus
);

router.get(
  "/delete-company",
  passport.checkAuthentication,
  companyController.deleteCompany
);

module.exports = router;
