const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    name:  String,
    companyId: {
        type: Schema.Types.ObjectId,
        ref: "company"
    },
    active: Boolean
});

module.exports = mongoose.model('Location', LocationSchema);