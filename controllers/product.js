const Product = require('../models/product');
const { httpCode } = require('../constants/httpResponse');

const getProducts = (req, res) => {	
	let query = req.query;
	query.companyId = req.companyId;
	if(!query){
		res.status(httpCode.badRequest).send({message: `Valores invalidos`, info: err});
		return;
	}	
	Product
	.find(query)
	.populate('categoryId', 'name')	
	.exec((err, products) => {		
		if(err)
			res.status(httpCode.internalErrorServer).send({message: `Error al consultar el listado de productos`, info: err});
		else
			res.status(httpCode.ok).send(products);
	});
}

const getProduct = (req, res) => {
	let query = req.query;
	query.companyId = req.companyId;
	if(!query){
		res.status(httpCode.internalErrorServer).send({message: `Valores invalidos`, info: err});
		return;
	}
	if(!query._id) query._id = req.params.productId;
	Product.findOne(query, (err, product) => {
		if(err)
			res.status(httpCode.internalErrorServer).send({message: `Error al buscar el producto`, info: err})
		else
			res.status(httpCode.ok).send(product);
	});
}

const updateProduct = (req, res) => {
    const query = {
		"_id": req.params.productId,
		"companyId": req.companyId
	}
	let data = req.body;
	if(req.companyId === data.companyId && req.params.productId === data._id){	
		Product.findOneAndUpdate(query, data, (err, products) => {
			if(err)
				res.status(httpCode.internalErrorServer).send({message: `Error al actualizar el producto`, info: err});
			else
				res.status(httpCode.ok).send(products);
		});
	} else 
		res.status(httpCode.badRequest).send({message: `Error datos incorrectos`});
}

const deleteProduct = (req, res) => {
    const query = {
		"_id": req.params.productId,
		"companyId": req.companyId
	}
	Product.findOneAndDelete(query, (err, product) => {
		if(err)
			res.status(httpCode.internalErrorServer).send({message: `Error al eliminar el producto`, info: err});
		else
			res.status(httpCode.ok).send(product);
	});
}

const insertProduct = (req, res, next) => {
	let product = new Product();
	product.name = req.body.name;
	product.categoryId = req.body.categoryId;	
	product.description = req.body.description;
	product.price = req.body.price;
	product.companyId = req.companyId;
	product.active = true;

	product.save((err, productStored) => {
		if(err) 
			res.status(httpCode.internalErrorServer).send({message: `Error al guardar en la base de datos`, info: err});
		else
			res.status(httpCode.ok).send(productStored);
	})
}


module.exports = {
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    insertProduct
}