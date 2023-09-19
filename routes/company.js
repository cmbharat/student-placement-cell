const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company_controller");

console.log("router loaded");

// router.get("/create-company", companyController.create);

router.get("/company-list", companyController.companiesList);

router.post("/add", companyController.createCompany);

router.get("/companyinfo", companyController.companyInfo);

router.post("/schedule-interview", companyController.scheduleInterview);

router.get("/companydetails", companyController.companydetails);

module.exports = router;
