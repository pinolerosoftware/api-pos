const User = require('../models/users')
const service = require('../services')



const getUsers = function(req, res, next) {
    User.find({active: true}, (err, categories) => {
		if(err)
			res.status(500).send({message: `Error al consultar el listado de usuarios`, info: err})
		else
			res.status(200).send({categories})
	});
}

const singUp = (req, res, next) => {
    const user = new User({
        email: req.body.email,
        userName:  req.body.userName,
        //avatar: req.body.avatar,
        password: req.body.password,
        signupDate: new Date(),
        active: true
    })
    
    User.save((err, user) => {
        if (err) res.status(500).send({message: `Error al crear el usuario ${err}`})

        return res.status(200).send({token: service.createToken(user), message: "Usuario creado exitosamente"})
    })
}

const signIn = (req, res, next) => {
    User.find({email: req.body.email, password: req.body.password}, (err, user) => {
        if (err) return res.status(500).send({message: `Error en el servidor ${err}`})
        if(!user) return res.status(404).send({message: `El usuario no existe`})

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