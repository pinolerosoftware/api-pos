const Category = require('../models/categories');

const getCategories = (req, res, next) => {
	let {companyId} = req.params;

    Category.find({companyId: companyId}, (err, categories) => {
		if(err) return res.status(500).send({message: `Error al consultar el listado de categorías`, info: err});
		
		return res.status(200).send({categories});
	});
}

const getCategory = (req, res, next) => {
	let {categoryId} = req.params;
	let {companyId} = req.params;

	Category.findOne({companyId: companyId, categoryId: categoryId}, (err, category) => {
		if(!category) return res.status(500).send({message: `Error, no se encontro la categoria`, info: err});

		if(err) return res.status(500).send({message: `Error, al buscar categoria`, info: err});
		
		return res.status(200).send({category});
	});
}

const insertCategory = (req, res, next) => {
	let {companyId} = req.params;

    let newCategory = new Category();
	newCategory.name = req.body.name;
	newCategory.companyId = req.body.companyId;
	newCategory.active = true;

	if(companyId != newCategory.companyId) return res.status(500).send({message: `Error, datos incorrecto`});
	
	Category.findOne({companyId: companyId, name: newCategory.name}, (err, category) => {
		if(category) return res.status(500).send({message: `La categoria ${newCategory.name} ya esta registrado`});

		if(err) return res.status(500).send({message: `Error, al buscar categoria`, info: err});

		newCategory.save((err, category) => {
			if(err) return res.status(500).send({message: `Error al insertar la categoría`, info: err});

			return res.status(200).send({message: "Almacenado exitosamente", category: category});
		});
	});
}

const updateCategory = (req, res, next) => {
	let {categoryId} = req.params;
	let {companyId} = req.params;

	let updateCategory = {};
	updateCategory.name = req.body.name;
	updateCategory.companyId = req.body.companyId;
	updateCategory.active = req.body.active;

	if(categoryId != req.body._id) return res.status(500).send({message: `Error, datos incorrecto`});
	if(companyId != req.body.companyId) return res.status(500).send({message: `Error, datos incorrecto`});

	Category.findOne({companyId: companyId, name: updateCategory.name}, (err, category) => {
		if(err) return res.status(500).send({message: `Error, al buscar categoria`, info: err});

		if(category){
			if(category._id != categoryId)
				return res.status(500).send({message: `La categoria ${newCategory.name} ya esta registrado`});
		}	

		Category.findByIdAndUpdate(categoryId, updateCategory, (err, category) => {
			if(err) return res.status(500).send({message: `Error al actualizar la categoría`, info: err});

			if(!category) return res.status(500).send({message: `Error, no se pudo actualizar datos de la categoria`});
			
			return res.status(200).send({message: "Actualizado exitosamente", category: category});
		});
	});	
}

const deleteCategory = (req, res, next) => {
    let {categoryId} = req.params;
	let {companyId} = req.params;

	if(categoryId != req.body._id) return res.status(500).send({message: `Error, datos incorrecto`});
	if(companyId != req.body.companyId) return res.status(500).send({message: `Error, datos incorrecto`});

	Category.findOne({companyId: req.body.companyId, _id: req.body._id}, (err, category) => {
		if(!category) return res.status(500).send({message: `Error, categoria no existe`});

		if(err) return res.status(500).send({message: `Error, al buscar categoria`, info: err});

		Category.findByIdAndDelete(categoryId, (err, category) => {
			if(err) return res.status(500).send({message: `Error al eliminar la categoria`, info: err});

			return	res.status(200).send({category});
		});
	});		
}

module.exports = {
    getCategories,
	getCategory,
	updateCategory,
	deleteCategory,
	insertCategory
}