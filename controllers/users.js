const bcrypt = require('bcrypt-nodejs');
const User = require('../models/users');
const Company = require('../models/companies');
const helperAccount = require('../helper/account');
const { httpCode } = require('../constants/httpResponse');

const getUsers = function(req, res) {
    User.find({active: true}, ['_id', 'firstName', 'lastName', 'email', 'userName', 'active'], (err, users) => {
		if(err)
			return res.status(httpCode.internalErrorServer).send({message: `Error al consultar el listado de usuarios`, info: err});
		else
			res.status(httpCode.ok).send({users})
	});
}

const signUp = (req, res) => {    
    var pass = bcrypt.hashSync(req.body.password);

    const newUser = new User({
        email: req.body.email,
        userName:  req.body.userName,        
        password: pass,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        signupDate: new Date(),
        active: true
    });  
	
    User.findOne({email: req.body.email}, (err, user) => {        
        if (err) return res.status(httpCode.internalErrorServer).send({message: `Error en el servidor ${err}`});

        if(user) return res.status(httpCode.internalErrorServer).send({message: `Correo ${req.body.email} ya esta registrado`});

        User.findOne({userName: req.body.userName}, (err, user) => {            
            if (err) return res.status(httpCode.internalErrorServer).send({message: `Error en el servidor ${err}`});

            if(user) return res.status(httpCode.internalErrorServer).send({message: `Usuario ${req.body.userName} ya esta registrado`});

            newUser.save((err, user) => {                
                if (err) return res.status(httpCode.internalErrorServer).send({message: `Error al crear el usuario ${err}`});               

                const newCompany = new Company({
                    name: req.body.name,
                    businessName: req.body.businessName,
                    address: req.body.address,
                    serviceCompany: req.body.serviceCompany,
                    productCompany: req.body.productCompany,
                    rut: req.body.rut,
                    phoneNumber: req.body.phoneNumber,
                    active: req.body.active,        
                    userId: user._id
                });
                
                newCompany.save((err, company) => {
                    if (err) return res.status(httpCode.internalErrorServer).send({message: `Error al crear los datos de la compañia ${err}`});
                    
                    User.updateOne({ _id: user._id}, { companyId: company._id }, (err, userModified) => {
                        if (err) return res.status(httpCode.internalErrorServer).send({message: `Error al registrar el usuario ${err}`});
                        
                        return res.status(httpCode.ok).send({
                            token: helperAccount.createToken(user), 
                            userId: user._id,
                            companyId: company._id,
                            message: "Usuario creado exitosamente"
                        });
                    });                    
                });                
            });    
        });
    }); 
}

const signIn = (req, res) => {  
    var email = req.body.email;
    var pass = req.body.password;
    
    User.findOne({email: email}, (err, user) => {        
        if (err) return res.status(httpCode.internalErrorServer).send({message: `Error en el servidor ${err}`})
        
        if (!user) return res.status(httpCode.badRequest).send({message: `El usuario no existe`})
        
        if(!bcrypt.compareSync(pass, user.password)) return res.status(404).send({message: `La contraseña es incorrecta`});        
        
        res.status(httpCode.ok).send({
            userId: user._id,
            companyId: user.companyId,
            message: "Has iniciado sesión correctamente",
            token: helperAccount.createToken(user)
        });
	});
}

module.exports = {
    signUp,
    signIn,
    getUsers,
}