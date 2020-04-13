const helperAccount = require('../helper/account');
const { httpCode } = require('../constants/httpResponse');
const User = require('../models/users');

const isAuth = (req, res, next) => {    
    if (!req.headers.authorization) {
        res.status(httpCode.forbidden).send({message: "No tienes autorización"});    
        return;
    }
    
    const token = req.headers.authorization.split(" ")[1];    
    helperAccount.decodeToken(token)
        .then(userId => {                        
            User.findById(userId, (err, user) => {
                if (err) {
                    res.status(httpCode.internalErrorServer).send({message: `Error en el servidor ${err}`})
                    return;
                }                
                if(!user) {
                    res.status(httpCode.internalErrorServer).send({message: `Token invalido, usuario invalido`})
                    return;
                }
                req.user = userId;
                next();
            });                       
        })
        .catch(response => {
            res.status(response.status).send({message: response.message});
        });
}

module.exports = isAuth