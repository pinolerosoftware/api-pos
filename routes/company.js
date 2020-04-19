const express = require('express');
const router = express.Router();
const CompaniesController = require('../controllers/company');
const auth = require('../middlewares/auth');

router.get('/:companyId', auth, CompaniesController.getCompany);

router.post('/', auth, CompaniesController.insertCompany);

router.put('/:companyId', auth, CompaniesController.updateCompany);

router.delete('/:companyId', auth, CompaniesController.deleteCompany);

module.exports = router;
