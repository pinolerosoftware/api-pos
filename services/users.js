const User = require('../models/users');
const bcrypt = require('bcrypt-nodejs');

const existsUser = async (id) => {
    const user = await User.findOne({_id: id});    
    return user;
};
const existsEmail = async (email) => {    
    const user = await User.findOne({email: email});    
    return user;
};
const existsUserNmae = async (userName) => {
    const user = await User.findOne({userName: userName});    
    return user;
};

const getUsers = async () => {
    const users = await User.find({active: true}, ['_id', 'userName', 'email', 'firstName', 'lastName']);
    return users;
};

const signUp = async (data) => {    
    const { email, userName, firstName, lastName } = data;
    const password = bcrypt.hashSync(data.password);
    const newUser = new User({
        email: email,        
        userName:  userName,        
        password: password,
        firstName: firstName,
        lastName: lastName,
        signupDate: new Date(),
        active: true
    });
    const user = await newUser.save();
    return user;
};

const signIn = async (data) => {
    const { email } = data;
    const user = await User.findOne({email: email});
    return user;
};

module.exports = {
    getUsers,
    signUp,
    signIn,
    existsEmail,
    existsUserNmae,
    existsUser
}