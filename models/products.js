const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name:  String,
    category: String,
    location:   String,
    description: String,
    price: {type: Number, default: 0},
    companyId: String,
    active: Boolean
});

module.exports = mongoose.model('Product', ProductSchema);