const Category = require('../models/categories');
const { httpCode } = require('../constants/httpResponse');

const getCategories = (req, res) => {
	let query = req.query;
	query.companyId = req.companyId;
	if(!query){
		res.status(httpCode.internalErrorServer).send({message: `Valores invalidos`, info: err});
		return;
	}
    Category.find(query, (err, categories) => {
		if(err)
			res.status(httpCode.internalErrorServer).send({message: `Error al consultar el listado de categorías`, info: err});
		else
			res.status(httpCode.ok).send(categories);
	});
}

const getCategory = (req, res) => {
	let query = req.query;
	query.companyId = req.companyId;
	if(!query){
		res.status(httpCode.internalErrorServer).send({message: `Valores invalidos`, info: err});
		return;
	}
	if(!query._id) query._id = req.params.categoryId;	
	Category.findOne(query, (err, category) => {		
		if(err)
			res.status(httpCode.internalErrorServer).send({message: `Error, al buscar categoria`, info: err});
		else
			res.status(httpCode.ok).send(category);
	});
}

const insertCategory = (req, res) => {
    let newCategory = new Category();
	newCategory.name = req.body.name;
	newCategory.companyId = req.companyId;
	newCategory.active = true;

	newCategory.save((err, category) => {
		if(err)
			res.status(httpCode.internalErrorServer).send({message: `Error, al buscar categoria`, info: err});		
		else
			res.status(httpCode.ok).send(category);					
	});
}

const updateCategory = (req, res) => {
	const query = {
		"_id": req.params.categoryId,
		"companyId": req.companyId
	};
	let data = req.body;	
	if(req.companyId === data.companyId && req.params.categoryId === data._id){	
		Category.findOneAndUpdate(query, data, (err, category) => {
			if(err){
				res.status(httpCode.internalErrorServer).send({message: `Error al actualizar la categoría`, info: err});
				return;
			}
			if(!category){
				res.status(httpCode.badRequest).send({message: `No se encontro la categoria`});
				return;
			}
			res.status(httpCode.ok).send(category);
		});
	} else 
		res.status(httpCode.badRequest).send({message: `Error datos incorrectos`});	
}

const deleteCategory = (req, res) => {
	const query = {
		"_id": req.params.categoryId,
		"companyId": req.companyId
	};
	Category.findOneAndDelete(query, (err, category) => {
		if(err){
			res.status(httpCode.internalErrorServer).send({message: `Error al eliminar la categoria`, info: err})
			return;
		}
		if(!category){
			res.status(httpCode.badRequest).send({message: `No se encontro la categoria`})
			return;
		}		
		res.status(httpCode.ok).send(category);
	});	
}

module.exports = {
    getCategories,
	getCategory,
	updateCategory,
	deleteCategory,
	insertCategory
}