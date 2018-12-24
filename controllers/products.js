const Product = require('../models/products');

const getProducts = (req, res, next) => {
    Product.find({}, (err, Products) => {
		if(err)
			res.status(500).send({message: `Error al consultar el listado de productos`, info: err})
		else
			res.status(200).send({Products})
	});
}

const getProduct = (req, res, next) => {
    let {productId} = req.params;
	let data = req.body;
	Product.findById(productId, data, (err, Products) => {
		if(err)
			res.status(500).send({message: `Error al actualizar el producto`, info: err})
		else
			res.status(200).send({Products})
	});
}

const updateProduct = (req, res, next) => {
    let {productId} = req.params;
	let data = req.body;
	Product.findByIdAndUpdate(productId, data, (err, Products) => {
		if(err)
			res.status(500).send({message: `Error al actualizar el producto`, info: err})
		else
			res.status(200).send({Products})
	});
}

const deleteProduct = (req, res, next) => {
    let {productId} = req.params;
	Product.findByIdAndDelete(productId, (err, Products) => {
		if(err)
			res.status(500).send({message: `Error al eliminar el producto`, info: err})
		else
			res.status(200).send({message: "Producto eliminado"})
	});
}

const insertProduct = (req, res, next) => {
	let product = new Product();
	product.name = req.body.name;
	product.category = req.body.category;
	product.location = req.body.location;
	product.description = req.body.description;
	product.price = req.body.price;

	product.save((err, productStored) => {
		if(err) 
			res.status(500).send({message: `Error al guardar en la base de datos`, info: err})
		else
			res.status(200).send({message: "Almacenado exitosamente", product: productStored})
	})
}


module.exports = {
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    insertProduct
}