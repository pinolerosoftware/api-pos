const express = require('express');
const router = express.Router();
const CategoriesController = require('../controllers/categories');

/* GET users listing. */
router.get('/', CategoriesController.getCategories);

router.get('/:categoryId', CategoriesController.getCategory);

router.put('/:categoryId', CategoriesController.updateCategory);

router.delete('/:categoryId', CategoriesController.deleteCategory);

router.post('/', CategoriesController.insertCategory);

module.exports = router;
