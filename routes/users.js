const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users')
const auth = require('../middlewares/auth')

/* GET users listing. */
router.post('/singup', UserController.singUp);

router.get('/singin', UserController.singIn);

router.get('/', auth, function(req, res, next) {
  res.status(200).send({message: "Tienes acceso"});
});

module.exports = router;
