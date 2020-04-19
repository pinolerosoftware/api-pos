const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    name:  String,
    companyId: {
        type: Schema.Types.ObjectId,
        ref: "company"
    },
    active: Boolean,
    creationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Location', LocationSchema);