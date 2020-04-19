const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const SalesController = require('../../controllers/sales/sales');

router.post('/', auth, SalesController.createSales);

module.exports = router;