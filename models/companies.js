const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    name: String,
    businessName: String,
    address: String,
    serviceCompany: Boolean,
    productCompany: Boolean,
    rut: String,
    phoneNumber: String,
    creationDate: { type: Date, default: Date.now },
    active: Boolean,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }    
});

module.exports = mongoose.model('Company', CompanySchema);