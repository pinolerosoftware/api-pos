const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name:  String,
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },    
    description: String,
    price: {type: Number, default: 0},
    companyId: { type: Schema.Types.ObjectId, ref: 'Company' },
    active: Boolean,
    creationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', ProductSchema);