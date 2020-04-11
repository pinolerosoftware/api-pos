const bcrypt = require('bcrypt-nodejs');
const helperAccount = require('../helper/account');
const serviceUsers = require('../services/users');
const { httpCode } = require('../constants/httpResponse');

const getUsers = function(req, res, next) {
    const users = serviceUsers.getUsers();
    users
    .then(data => {
        res.status(httpCode.ok).send(data);
    })
    .catch(error => {
        res.status(httpCode.internalErrorServer).send({message: `Error al consultar el listado de usuarios`, info: err});
    });
}

const signUp = (req, res, next) => {    
    let email = req.body.email;
    let userName = req.body.userName;
    const existsEmail = serviceUsers.existsEmail(email);
    const existsUseName = serviceUsers.existsUserNmae(userName);    
    existsEmail
    .then(valueEmail => {
        console.log(valueEmail);
        if(valueEmail)
            res.status(httpCode.internalErrorServer).send({message: `El email ${email} ya esta registrado`});
        else {
            existsUseName
            .then(valueUserName => {
                if(valueUserName)
                    res.status(httpCode.internalErrorServer).send({message: `El nombre de usuario ${userName} ya esta registrado`});
                else {
                    const newUser = serviceUsers.signUp(req.body);
                    newUser
                    .then(user => {
                        res.status(httpCode.ok).send({token: helperAccount.createToken(user), message: "Usuario creado exitosamente"});
                    })
                    .catch(error => {
                        res.status(httpCode.internalErrorServer).send({message: `${error}`});
                    });
                }
            })
            .catch(err => {
                res.status(httpCode.internalErrorServer).send({message: `${err}`});
            });
        }        
    })
    .catch(err => {
        res.status(httpCode.internalErrorServer).send({message: `${err}`});
    });   
}

const signIn = (req, res, next) => {  
    const { password } = req.body;    
    const userFind = serviceUsers.signIn(req.body);    
    userFind
    .then(user => {        
        if(!user) {
            res.status(httpCode.notFound).send({message: `El correo no se encuentra registrado`});
            return;
        }
        if(!bcrypt.compareSync(password, user.password)) {
            res.status(httpCode.notFound).send({message: `La contraseña es incorrecta`});
            return;
        }            
        res.status(httpCode.ok).send({
            message: "Se inicio sesión correctamente",
            token: helperAccount.createToken(user)
        })
    })
    .catch(err => {
        res.status(httpCode.internalErrorServer).send({message: `${err}`});
    });  
}

module.exports = {
    signUp,
    signIn,
    getUsers,
}