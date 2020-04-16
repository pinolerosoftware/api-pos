const Location = require('../models/locations');
const { httpCode } = require('../constants/httpResponse');

const getLocations = (req, res) => {	
	let query = req.query;
	query.companyId = req.companyId;	
	if(!query){
		res.status(httpCode.internalErrorServer).send({message: `Valores invalidos`, info: err});
		return;
	}	
    Location.find(query, (err, locations) => {		
		if(err)
			res.status(httpCode.internalErrorServer).send({message: `Error al consultar el listado de ubicaciones`, info: err})
		else
			res.status(httpCode.ok).send(locations)
	});
}

const getLocation = (req, res) => {
	let query = req.query;
	query.companyId = req.companyId;	
	if(!query){
		res.status(httpCode.internalErrorServer).send({message: `Valores invalidos`, info: err});
		return;
	}	
	if(!query._id) query._id = req.params.locationId;	
	Location.findOne(query, (err, location) => {
		if(err)
			res.status(httpCode.internalErrorServer).send({message: `Error al actualizar la ubicación`, info: err})
		else
			res.status(httpCode.ok).send(location)
	});
}

const updateLocation = (req, res) => {	
	const query = {
		"_id": req.params.locationId,
		"companyId": req.companyId
	};
	let data = req.body;	
	if(req.companyId === data.companyId && req.params.locationId === data._id){	
		Location.findOneAndUpdate(query, data, (err, location) => {
			if(err)
				res.status(httpCode.internalErrorServer).send({message: `Error al actualizar la ubicación`, info: err})
			else
				res.status(httpCode.ok).send(location);
		});
	} else 
		res.status(httpCode.badRequest).send({message: `Error datos incorrectos`})
}

const deleteLocation = (req, res) => {
    const query = {
		"_id": req.params.locationId,
		"companyId": req.companyId
	};
	
	Location.findOneAndDelete(query, (err, location) => {
		if(err)
			res.status(httpCode.internalErrorServer).send({message: `Error al eliminar la ubicación`, info: err})
		else
			res.status(httpCode.ok).send(location);
	});
}

const insertLocation = (req, res) => {
	let location = new Location();
    location.name = req.body.name;
	location.companyId = req.companyId;
	location.active = true;

	location.save((err, location) => {
		if(err) 
			res.status(httpCode.internalErrorServer).send({message: `Error al guardar en la base de datos`, info: err})
		else
			res.status(httpCode.ok).send(location)
	})
}


module.exports = {
    getLocations,
    getLocation,
    updateLocation,
    deleteLocation,
    insertLocation
}