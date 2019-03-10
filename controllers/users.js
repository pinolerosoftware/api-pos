const User = require('../models/users')
const service = require('../services')
const bcrypt = require('bcrypt-nodejs');

const getUsers = function(req, res, next) {
    User.find({active: true}, (err, categories) => {
		if(err)
			res.status(500).send({message: `Error al consultar el listado de usuarios`, info: err})
		else
			res.status(200).send({categories})
	});
}

const singUp = (req, res, next) => {

    var pass = bcrypt.hashSync(req.body.password);

    console.log(pass);
    const newUser = new User({
        email: req.body.email,
        userName:  req.body.userName,        
        password: pass,
        signupDate: new Date(),
        active: true
    })
    
    User.find({email: req.body.email}, (err, user) => {        
        if (err) return res.status(500).send({message: `Correo ${req.body.email} ya esta registrado ${err}`});

        User.find({userName: req.body.userName}, (err, user) => {            
            if (err) return res.status(500).send({message: `usuario ${req.body.userName} ya esta registrado ${err}`});

            newUser.save((err) => {                
                if (err) return res.status(500).send({message: `Error al crear el usuario ${err}`})

                return res.status(200).send({token: service.createToken(user), message: "Usuario creado exitosamente"})
            })    
        });
    }); 
}

const signIn = (req, res, next) => {    

    var email = req.body.email;
    var pass = req.body.password;
    
    User.findOne({email: email}, (err, user) => {                
        if (err) return res.status(500).send({message: `Error en el servidor ${err}`})

        if (!user) return res.status(404).send({message: `El usuario no existe`})
        
        if(!bcrypt.compareSync(pass, user.password)) return res.status(404).send({message: `La contraseña es incorrecta`});

        res.status(200).send({
            message: "Te has logeado correctamente",
            token: service.createToken(user)
        })
	})
}

module.exports = {
    singUp,
    signIn,
    getUsers,
}