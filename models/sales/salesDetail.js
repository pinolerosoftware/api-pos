const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SalesDetailSchema = new Schema({
    salesId: { type: Schema.Types.ObjectId, ref: "sales" },
    productId: { type: Schema.Types.ObjectId, ref: "products" },
    quantity: { type: Schema.Types.Number },
    unitPrice: { type: Schema.Types.Number },
    total: { type: Schema.Types.Number },    
});

module.exports = mongoose.model('SalesDetail', SalesDetailSchema);