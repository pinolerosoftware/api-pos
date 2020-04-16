const express = require('express');
const router = express.Router();
const CategoriesController = require('../controllers/categories');
const auth = require('../middlewares/auth')

/* GET users listing. */

router.get('/', auth, CategoriesController.getCategories);

router.get('/:categoryId', auth, CategoriesController.getCategory);

router.post('/', auth, CategoriesController.insertCategory);

router.put('/:categoryId', auth, CategoriesController.updateCategory);

router.delete('/:categoryId', auth, CategoriesController.deleteCategory);


module.exports = router;
