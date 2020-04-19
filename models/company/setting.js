const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SettingSchema = new Schema({
    companyId: { type: Schema.Types.ObjectId, ref: "company" },
    monedaName: { type: Schema.Types.String },
    monedaSymbolo: { type: Schema.Types.String },
    monedaCantidadDecimal: { type: Schema.Types.Number },
    taxPorcentage: { type: Schema.Types.Number },
    creationUser: { type: Schema.Types.ObjectId, ref: "user"},
    updateUser: { type: Schema.Types.ObjectId, ref: "user"},
    creationDate: { type: Schema.Types.Date, default: Date.now },
    updateDate: { type: Schema.Types.Date }
});

module.exports = mongoose.model('Setting', SettingSchema);