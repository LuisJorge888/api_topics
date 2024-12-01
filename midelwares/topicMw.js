const { sendResponseJson } = require('../utils/responseHandler');

function validateBodyDataName(req, res, next){

    let errors  = [];

    let data = {
        name : req.body.name
    }

    if(data.name == "" || data.name == null){
        errors.push("name can't be null.")
    }

    if((data.name != "" || data.name != null) & data.name.length > 48){
        errors.push("name can't have more than 48 charters.")
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

        if(!Number.isInteger(data.id)){

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
    validateBodyDataName,
    validateParamId
}