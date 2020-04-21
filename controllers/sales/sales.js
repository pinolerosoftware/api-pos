const Sales = require('../../models/sales/sales');
const SalesDetail = require('../../models/sales/salesDetail');
const { httpCode } = require('../../constants/httpResponse');

const createSales = (req, res) => {
    let { sales, salesDetails } = req.body;
    const newSales = new Sales(sales);    
    if(sales.companyId === req.companyId && sales.userId === req.userId){
        newSales.save((err, sales) => {
            if(err){
                res.status(httpCode.internalErrorServer).send({message: `Error al guardar la venta`, info: err});
                return;
            }
            salesDetails.map(item => item.salesId = sales._id);            
            SalesDetail.insertMany(salesDetails,(err, salesDetailIds) => {
                if(err){
                    res.status(httpCode.internalErrorServer).send({message: `Error al guardar la venta`, info: err});
                    return;
                }
                let ids = [];
                salesDetailIds.map(item => ids.push(item._id));
                sales.salesDetail = ids;
                Sales.findOneAndUpdate({ _id: sales}, sales, (err, salesModify) => {
                    if(err){
                        res.status(httpCode.internalErrorServer).send({message: `Error al guardar la venta`, info: err});
                        return;
                    }
                    res.status(httpCode.ok).send(sales);
                });
            });
        });
    } else
        res.status(httpCode.badRequest).send({message: `Error datos incorrectos`});
}

module.exports = {
    createSales
}