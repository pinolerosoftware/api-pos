const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    name:  String,
    companyId: String,
    active: Boolean
});

module.exports = mongoose.model('Location', LocationSchema);