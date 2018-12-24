const mongoose = require('mongoose');
const User = require('../models/users')
const service = require('../services')

const singUp = (req, res, next) => {
    const user = new User({
        email: req.body.email,
        userName:  req.body.userName,
        avatar: req.body.avatar,
        password: req.body.password,
        signupDate: new Date()
    })

    user.save(err => {
        if (err) res.status(500).send({message: `Error al crear el usuario ${err}`})

        return res.status(200).send({token: service.createToken(user), message: "Usuario creado exitosamente"})
    })
}

const singIn = (req, res, next) => {
    user.find({email: req.body.email}, (err, user) => {
        if (err) return res.status(500).send({message: `Error en el servidor ${err}`})
        if(!user) return res.status(404).send({message: `El usuario no existe`})

        req.user = user
        res.status(200).send({
            message: "Te has logeado correctamente",
            token: service.createToken(user)
        })
    })
}

module.exports = {
    singUp,
    singIn,
}