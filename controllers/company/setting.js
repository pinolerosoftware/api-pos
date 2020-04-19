const Setting = require('../../models/company/setting');
const { httpCode } = require('../../constants/httpResponse');

const updateSetting = (req, res) => {
    const query = {
		"_id": req.params.settingId,
		"companyId": req.companyId
    };
    let data = req.body;
    if(req.companyId === data.companyId && req.params.settingId === data._id){	
        Setting.findOneAndUpdate(query, data, (err, setting) => {
            if(err)
				res.status(httpCode.internalErrorServer).send({message: `Error al actualizar la configuración`, info: err})
			else
				res.status(httpCode.ok).send(setting);
            });
    } else 
		res.status(httpCode.badRequest).send({message: `Error datos incorrectos`});
}

const getSetting = (req, res) => {
    let query = {
        companyId: req.companyId
    };
    if(!query){
		res.status(httpCode.internalErrorServer).send({message: `Valores invalidos`, info: err});
		return;
    }    
    if(req.companyId === req.params.companyId){        
        Setting.findOne(query, (err, setting) => {
            if(err)
                res.status(httpCode.internalErrorServer).send({message: `Error al buscar las configuración`, info: err})
            else
                res.status(httpCode.ok).send(setting)
        });
    } else {
        res.status(httpCode.badRequest).send({message: `Error datos incorrectos`})
    }
}

const createSettingDefault = (companyId, userId) => {
    const setting = new Setting({
        companyId: companyId,
        creationUser: userId,
        monedaName: "Cordoba",
        monedaSymbolo: "C$",
        monedaCantidadDecimal: 2,
        taxPorcentage: 0
    });    
    setting.save((err, settignSave) => {        
    });
}

module.exports = {
    updateSetting,
    createSettingDefault,
    getSetting
}