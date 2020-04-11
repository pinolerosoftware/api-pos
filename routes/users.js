const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users')
const auth = require('../middlewares/auth')

/* GET users listing. */
router.post('/signup', UserController.signUp);

router.post('/signin', UserController.signIn);

router.get('/', auth, UserController.getUsers);

module.exports = router;
