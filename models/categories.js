const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name:  String,
    companyId: String,
    active: Boolean
});

module.exports = mongoose.model('Category', CategorySchema);