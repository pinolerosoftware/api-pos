const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {type: String, unique: true, lowercase: true},
    userName:  String,
    avatar: String,
    password: {type: String},
    signupDate: {type: Date, default: Date.now()},
    firstName: String,
    lastName: String,    
    lastLogin: Date,
    companyId: {
        type: Schema.Types.ObjectId,
        ref: "company"
    },
    active: Boolean
});

module.exports = mongoose.model('User', UserSchema);