const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SaleSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    date: { type: Schema.Types.Date, default: Date.now },
    subTotal: { type: Schema.Types.Number },
    tax: { type: Schema.Types.Number },
    total: { type: Schema.Types.Number },
    anulado: { type: Schema.Types.Boolean, default: false },
    salesDetail: [{ type: Schema.Types.ObjectId, ref: "salesdetails" }]
});

module.exports = mongoose.model('Sales', SaleSchema);