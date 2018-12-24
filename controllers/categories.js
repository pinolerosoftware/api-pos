const Category = require('../models/categories');

const getCategories = (req, res, next) => {
    Category.find({}, (err, categories) => {
		if(err)
			res.status(500).send({message: `Error al consultar el listado de categorías`, info: err})
		else
			res.status(200).send({categories})
	});
}

const getCategory = (req, res, next) => {
    let {categoryId} = req.params;
	let data = req.body;
	Category.findById(categoryId, data, (err, category) => {
		if(err)
			res.status(500).send({message: `Error al actualizar la categoría`, info: err})
		else
			res.status(200).send({category})
	});
}

const updateCategory = (req, res, next) => {
    let {categoryId} = req.params;
	let data = req.body;
	Category.findByIdAndUpdate(categoryId, data, (err, Category) => {
		if(err)
			res.status(500).send({message: `Error al actualizar la categoría`, info: err})
		else
			res.status(200).send({message: "Actualizado exitosamente", category: Category})
	});
}

const deleteCategory = (req, res, next) => {
    let {categoryId} = req.params;
	Category.findByIdAndDelete(categoryId, (err, Category) => {
		if(err)
			res.status(500).send({message: `Error al eliminar la categoría`, info: err})
        else
			res.status(200).send({message : "Categoría eliminada"})
	});
}

const insertCategory = (req, res, next) => {
    let category = new Category();
	category.name = req.body.name;
	
    category.save((err, categoryStored) => {
		if(err)
			res.status(500).send({message: `Error al insertar la categoría`, info: err})
		else
			res.status(200).send({message: "Almacenado exitosamente", category: categoryStored})
    });
}

module.exports = {
    getCategories,
	getCategory,
	updateCategory,
	deleteCategory,
	insertCategory
}