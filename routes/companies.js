const express = require('express');
const router = express.Router();
const CompaniesController = require('../controllers/companies');

router.get('/', CompaniesController.getcompanies);

router.post('/', CompaniesController.insertCompany);

module.exports = router;
