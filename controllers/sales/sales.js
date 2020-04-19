const Sales = require('../../models/sales/sales');
const SalesDetail = require('../../models/sales/salesDetail');
const { httpCode } = require('../../constants/httpResponse');

const createSales = (req, res) => {
    res.status(200).send({});
}

module.exports = {
    createSales
}