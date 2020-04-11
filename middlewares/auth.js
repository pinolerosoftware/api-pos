const helperAccount = require('../helper/account');
const { httpCode } = require('../constants/httpResponse');
const serviceUsers = require('../services/users');

const isAuth = (req, res, next) => {    
    if (!req.headers.authorization)
        return res.status(httpCode.forbidden).send({message: "No tienes autorizacion"});    
    const token = req.headers.authorization.split(" ")[1];    
    helperAccount.decodeToken(token)
        .then(userId => {            
            const user = serviceUsers.existsUser(userId);
            console.log(user);
            user
            .then(userModel => {
                console.log(userModel);
                if(!userModel) {
                    res.status(httpCode.forbidden).send({message: "Token invalido, usuario no registrado"});
                    return;
                }
                req.user = userId;
                next();
            })
            .catch(err => {
                res.status(httpCode.internalErrorServer).send({message: `${err}`});
            });
        })
        .catch(response => {
            res.status(response.status).send(response.message)
        });
}

module.exports = isAuth