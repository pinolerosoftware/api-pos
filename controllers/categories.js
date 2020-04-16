const Category = require('../models/categories');
const { httpCode } = require('../constants/httpResponse');

const getCategories = (req, res) => {
	const query = req.query;
	if(!query){
		res.status(httpCode.internalErrorServer).send({message: `Valores invalidos`, info: err});
		return;
	}
    Category.find(query, (err, categories) => {
		if(err){ 
			res.status(httpCode.internalErrorServer).send({message: `Error al consultar el listado de categorías`, info: err});
			return;
		}
		res.status(httpCode.ok).send(categories);
	});
}

const getCategory = (req, res) => {
	let query = req.query;
	if(!query){
		res.status(httpCode.internalErrorServer).send({message: `Valores invalidos`, info: err});
		return;
	}
	query._id = req.params.categoryId;
	Category.findOne(query, (err, category) => {
		if(!category){
			res.status(httpCode.internalErrorServer).send({message: `Error, no se encontro la categoria`, info: err});			
			return;
		}
		if(err){
			res.status(httpCode.internalErrorServer).send({message: `Error, al buscar categoria`, info: err});
			return;
		}
		res.status(httpCode.ok).send(category);
	});
}

const insertCategory = (req, res) => {
    let newCategory = new Category();
	newCategory.name = req.body.name;
	newCategory.companyId = req.body.companyId;
	newCategory.active = true;
	
	Category.findOne({companyId: companyId, name: newCategory.name}, (err, category) => {
		if(category){
			res.status(httpCode.internalErrorServer).send({message: `La categoria ${newCategory.name} ya esta registrado`});
			return;
		}
		if(err){
			res.status(httpCode.internalErrorServer).send({message: `Error, al buscar categoria`, info: err});	
			return;
		}
		newCategory.save((err, category) => {
			if(err) {
				res.status(httpCode.internalErrorServer).send({message: `Error al insertar la categoría`, info: err});
				return;
			}
			res.status(httpCode.ok).send({message: "Almacenado exitosamente", category: category});
		});
	});
}

const updateCategory = (req, res) => {
	let query = req.query;
	query.categoryId = req.params.categoryId;	

	let updateCategory = {};
	updateCategory.name = req.body.name;
	updateCategory.companyId = req.body.companyId;
	updateCategory.active = req.body.active;

	Category.findOne({companyId: query.companyId, name: updateCategory.name}, (err, category) => {
		if(err){
			res.status(httpCode.internalErrorServer).send({message: `Error, al buscar categoria`, info: err});
			return;
		}
		if(category){
			if(category._id != categoryId){
				res.status(httpCode.internalErrorServer).send({message: `La categoria ${newCategory.name} ya esta registrado`});
				return;
			}
		}
		Category.findByIdAndUpdate(query.categoryId, updateCategory, (err, category) => {
			if(err){
				res.status(httpCode.internalErrorServer).send({message: `Error al actualizar la categoría`, info: err});
				return;
			}

			if(!category){
				res.status(httpCode.internalErrorServer).send({message: `Error, no se pudo actualizar datos de la categoria`});
				return;
			}
			
			res.status(httpCode.ok).send({message: "Actualizado exitosamente", category: category});
		});
	});	
}

const deleteCategory = (req, res) => {
	let query = req.query;
    let {categoryId} = req.params;
	query.categoryId = categoryId;
	Category.findOne(query, (err, categoryFind) => {
		if(!categoryFind) {
			res.status(httpCode.internalErrorServer).send({message: `Error, categoria no existe`});
			return;
		}
		if(err){
			res.status(httpCode.internalErrorServer).send({message: `Error, al buscar categoria`, info: err});
			return;
		}
		Category.findByIdAndDelete(categoryFind._id, (err, category) => {
			if(err){
				res.status(httpCode.internalErrorServer).send({message: `Error al eliminar la categoria`, info: err});
				return;
			}

			res.status(httpCode.ok).send({category});
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