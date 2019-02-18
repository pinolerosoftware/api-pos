const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    name:  String,
    legalName: String,
    address: String,
    serviceCompany: Boolean,
    productCompany: Boolean,
    RUT: String,
    phoneNumber: String,
    creationDate: { type: Date, default: Date.now },
    active: Boolean
});

module.exports = mongoose.model('Company', CompanySchema);