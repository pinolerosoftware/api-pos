const express = require('express');
const router = express.Router();
const CategoriesController = require('../controllers/categories');
const auth = require('../middlewares/auth')

/* GET users listing. */

router.get('/:companyId', auth, CategoriesController.getCategories);

router.get('/:companyId/:categoryId', auth, CategoriesController.getCategory);

router.post('/:companyId', auth, CategoriesController.insertCategory);

router.put('/:companyId/:categoryId', auth, CategoriesController.updateCategory);

router.delete('/:companyId/:categoryId', auth, CategoriesController.deleteCategory);


module.exports = router;
