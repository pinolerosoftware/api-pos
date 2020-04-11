const bcrypt = require('bcrypt-nodejs');
const User = require('../models/users');
const helperAccount = require('../helper/account');
const { httpCode } = require('../constants/httpResponse');

const getUsers = function(req, res) {
    User.find({active: true}, ['_id', 'firstName', 'lastName', 'email', 'userName', 'active'], (err, users) => {
		if(err)
			return res.status(httpCode.internalErrorServer).send({message: `Error al consultar el listado de usuarios`, info: err})
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
    })
    
    User.findOne({email: req.body.email}, (err, user) => {        
        if (err) return res.status(500).send({message: `Error en el servidor ${err}`});

        if(user) return res.status(500).send({message: `Correo ${req.body.email} ya esta registrado`});

        User.findOne({userName: req.body.userName}, (err, user) => {            
            if (err) return res.status(500).send({message: `Error en el servidor ${err}`});

            if(user) return res.status(500).send({message: `Usuario ${req.body.userName} ya esta registrado`});

            newUser.save((err, user) => {                
                if (err) return res.status(500).send({message: `Error al crear el usuario ${err}`})

                return res.status(200).send({token: helperAccount.createToken(user), message: "Usuario creado exitosamente"})
            })    
        });
    }); 
}

const signIn = (req, res) => {  
    var email = req.body.email;
    var pass = req.body.password;
    
    User.findOne({email: email}, (err, user) => {                
        if (err) return res.status(500).send({message: `Error en el servidor ${err}`})

        if (!user) return res.status(404).send({message: `El usuario no existe`})
        
        if(!bcrypt.compareSync(pass, user.password)) return res.status(404).send({message: `La contraseña es incorrecta`});

        res.status(200).send({
            message: "Te has logeado correctamente",
            token: helperAccount.createToken(user)
        })
	})
}

module.exports = {
    signUp,
    signIn,
    getUsers,
}