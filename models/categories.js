const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name:  String,
    companyId: {
        type: Schema.Types.ObjectId,
        ref: "Company"
    },
    active: Boolean
});

module.exports = mongoose.model('Category', CategorySchema);