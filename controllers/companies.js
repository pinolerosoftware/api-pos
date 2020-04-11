const Company = require('../models/companies');

const getCompanies = (req, res) => {
    Company.find({userId: req.user}, (err, companies) => {
		if(err) return res.status(500).send({message: `Error al consultar el listado de compañias`, info: err});
		
		return	res.status(200).send({companies});
	});
}

const getCompany = (req, res) => {
	let {companyId} = req.params;
	
    Company.findOne({userId: req.user, _id: companyId}, (err, company) => {

		if(!company) return res.status(500).send({message: `Error, compañia no existe`});
		
		if(err) return res.status(500).send({message: `Error al obtener compañia`, info: err});
		
		return	res.status(200).send({company});
	});
}

const insertCompany = (req, res) => {	
    let newCompany = new Company();
	newCompany.name = req.body.name;
	newCompany.businessName = req.body.businessName;
	newCompany.address = req.body.address;
	newCompany.serviceCompany = req.body.serviceCompany;
	newCompany.productCompany = req.body.productCompany;
	newCompany.rut = req.body.rut;
	newCompany.phoneNumber = req.body.phoneNumber;
	newCompany.active = req.body.active;
	newCompany.userId = req.user;

	Company.findOne({rut: newCompany.rut}, (err, company) => {
		if (err) return res.status(500).send({message: `Error en el servidor`, info: err});

		if(company) return res.status(500).send({message: `Número rut ${company.rut} ya esta registrado`});

		Company.findOne({businessName: newCompany.businessName}, (err, company) => {
			if (err) return res.status(500).send({message: `Error en el servidor`, info: err});

			if(company) return res.status(500).send({message: `Razon social ${company.businessName} ya esta registrado`});	

			newCompany.save((err, company) => {
				if(err) return res.status(500).send({message: `Error al insertar la compañia`, info: err})
				
				return res.status(200).send({message: "Almacenado exitosamente", company: company});
			});
		});
	});    
}

const updateCompany = (req, res) => {
	let {companyId} = req.params;
	
	if(companyId != req.body._id) return res.status(500).send({message: `Error, datos incorrectos`});

	let updateCompany = {};
	updateCompany.name = req.body.name;
	updateCompany.businessName = req.body.businessName;
	updateCompany.address = req.body.address;
	updateCompany.serviceCompany = req.body.serviceCompany;
	updateCompany.productCompany = req.body.productCompany;
	updateCompany.rut = req.body.rut;
	updateCompany.phoneNumber = req.body.phoneNumber;
	updateCompany.active = req.body.active;

	Company.findOne({businessName: updateCompany.businessName}, (err, company) => {
		if (err) return res.status(500).send({message: `Error en el servidor`, info: err});

		if(company){
			if(company._id != companyId)
				return res.status(500).send({message: `Razon social ${company.businessName} ya esta registrado`});
		} 

		Company.findOne({rut: updateCompany.rut}, (err, company) => {
			if (err) return res.status(500).send({message: `Error en el servidor`, info: err});

			if(company){
				if(company._id != companyId)
					return res.status(500).send({message: `Número rut ${company.rut} ya esta registrado`});
			} 

			Company.findByIdAndUpdate(companyId, updateCompany, (err, company) => {
				if (err) return res.status(500).send({message: `Error en el servidor`, info: err});

				if(!company) return res.status(500).send({message: `Error, no se pudo actualizar datos de la compañia`});

				return res.status(200).send(company);
			});
		});
	});	
}

const deleteCompany = (req, res) => {
	let {companyId} = req.params;

	if(companyId != req.body._id) return res.status(500).send({message: `Error, datos incorrectos`});

    Company.findOne({userId: req.user, _id: companyId}, (err, company) => {
		
		if(!company) return res.status(500).send({message: `Error, compañia no existe`});

		if(err) return res.status(500).send({message: `Error al obtener compañia`, info: err});

		Company.findByIdAndDelete(companyId, (err, company) => {
			if(err) return res.status(500).send({message: `Error al obtener compañia`, info: err});

			return	res.status(200).send({company});
		});		
	});
}

module.exports = {
	getCompanies,
	getCompany,
	insertCompany,
	updateCompany,
	deleteCompany
}