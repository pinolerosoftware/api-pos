const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')
const { httpCode } = require('../constants/httpResponse');

const createToken = (user) => {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(config.DAY_TOKEN_EXPIRE, 'days').unix(),
    }
    return jwt.encode(payload, config.SECRET_TOKEN)
}

const decodeToken = (token) => {    
    const decoded = new Promise((resolve, reject) =>{
        try{
            const payload = jwt.decode(token, config.SECRET_TOKEN);
            if (payload.exp <= moment().unix()) {
                resolve({
                    status: httpCode.unauthorized,
                    message: "El token ha expirado"
                });   
                return;             
            }            
            resolve(payload.sub);
        } catch(err){
            reject({
                status: httpCode.internalErrorServer,
                message: "Invalid Token"
            });
        }
    })
    return decoded
}

module.exports = {
    createToken,
    decodeToken
}