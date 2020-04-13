const Location = require('../models/locations');
const { httpCode } = require('../constants/httpResponse');

const getLocations = (req, res) => {
	const query = req.query;	
    Location.find(query, (err, locations) => {		
		if(err)
			res.status(httpCode.internalErrorServer).send({message: `Error al consultar el listado de ubicaciones`, info: err})
		else
			res.status(httpCode.ok).send(locations)
	});
}

const getLocation = (req, res) => {
    let {locationId} = req.params;
	let data = req.body;
	Location.findById(locationId, data, (err, location) => {
		if(err)
			res.status(httpCode.internalErrorServer).send({message: `Error al actualizar la ubicación`, info: err})
		else
			res.status(httpCode.ok).send(location)
	});
}

const updateLocation = (req, res) => {
    let {locationId} = req.params;
	let data = req.body;
	Location.findByIdAndUpdate(locationId, data, (err, location) => {
		if(err)
			res.status(500).send({message: `Error al actualizar la ubicación`, info: err})
		else
			res.status(200).send({message: "Actualizado exitosamente", location})
	});
}

const deleteLocation = (req, res) => {
    let {locationId} = req.params;
	Location.findByIdAndDelete(locationId, (err, Locations) => {
		if(err)
			res.status(500).send({message: `Error al eliminar la ubicación`, info: err})
        else
			res.status(200).send({message : "Ubicación eliminada"})
	});
}

const insertLocation = (req, res) => {
	let location = new Location();
    location.name = req.body.name;
	location.companyId = req.body.companyId;
	location.active = true;

	location.save((err, locationStored) => {
		if(err) 
			res.status(httpCode.internalErrorServer).send({message: `Error al guardar en la base de datos`, info: err})
		else
			res.status(httpCode.ok).send({message: "Almacenado exitosamente", location: locationStored})
	})
}


module.exports = {
    getLocations,
    getLocation,
    updateLocation,
    deleteLocation,
    insertLocation
}