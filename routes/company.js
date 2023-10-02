const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company_controller");

router.get("/company-list", companyController.companiesList);

router.post("/add", companyController.createCompany);

router.get("/companyinfo", companyController.companyInfo);

router.post("/schedule-interview", companyController.scheduleInterview);

router.get("/companydetails", companyController.companydetails);

router.post("/update-status/:id", companyController.updateStatus);

router.get("/delete-company", companyController.deleteCompany);

module.exports = router;
