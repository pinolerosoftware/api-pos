const Company = require('../models/companies');

const getcompanies = (req, res, next) => {
    Company.find({active : true}, (err, companies) => {
		if(err)
			res.status(500).send({message: `Error al consultar el listado de compañias`, info: err})
		else
			res.status(200).send({companies})
	});
}

const insertCompany = (req, res, next) => {
    let company = new Company();
	company.name = req.body.name;
	company.legalName = req.body.legalName;
	company.address = req.body.address;
	company.serviceCompany = req.body.serviceCompany;
	company.productCompany = req.body.productCompany;
	company.RUT = req.body.RUT;
	company.phoneNumber = req.body.phoneNumber;
	company.creationDate = req.body.creationDate;
	company.active = req.body.active;
	
    company.save((err, companyStored) => {
		if(err)
			res.status(500).send({message: `Error al insertar la compañia`, info: err})
		else
			res.status(200).send({message: "Almacenado exitosamente", company: companyStored})
    });
}


module.exports = {
	getcompanies,
	insertCompany
}