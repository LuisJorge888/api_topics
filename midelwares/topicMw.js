const { sendResponseJson } = require('../utils/responseHandler');

function validateBodyDataTopic(req, res, next){

    let errors  = [];

    let data = {
        name : req.body.name,
        price: req.body.price
    }

    if(data.name == "" || data.name == null){
        errors.push("name can't be null.")
    }

    if((data.name != "" || data.name != null) & data.name.length > 48){
        errors.push("name can't have more than 48 charters.")
    }

    if(data.price == "" || data.price == null){

        errors.push("price can't be null.")
    }else{

        if(!Number.isInteger(data.price)){

            errors.push("price must be a number.")
        }else{

            if(parseInt(data.id) < 0){
                errors.push("price must be mayor than or equals to 0.")
            }
        }   
    }

    if(errors.length == 0){
        next();
    }else{
        sendResponseJson(errors, 400, res);
    }
}

function validateParamId(req, res, next){

    let errors = [];

    let data = {
        id : req.params.id
    }

    if(data.id == "" || data.id == null){

        errors.push("Id is required.")

    }else{
        console.log(Number(data.id));

        if(Number(data.id) === NaN){

            errors.push("Id must be a number.")
        }else{

            if(parseInt(data.id) < 1){
                errors.push("Id must be mayor than 0.")
            }
        }   
    }

    if(errors.length == 0){
        next();
    }else{
        sendResponseJson(errors, 400, res);
    }
}



module.exports = {
    validateBodyDataTopic,
    validateParamId
}