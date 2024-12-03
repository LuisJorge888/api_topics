const Topic = require('../models/topic');
const Price = require('../models/price');

const { sendResponseJson } = require('../utils/responseHandler');

class PriceController{

    constructor(){

    };

    async create(req, res){
        
        let data = {
            id : req.params.id,
            price : req.body.price 
        }
        
        let resCode = null;
        let msg     = null;

        let topic = await Topic.getTopicById(data.id);

        if(topic != null){

            let newPrice = new Price(null, data.price, topic.id);

            if(await newPrice.create()){

                resCode = 201;
                msg     = "OK"; 
            }else{
                
                resCode = 400;
                msg     = "ups!!";
            }

        }else{  
            resCode = 400;
            msg     = "Topic does not exists.";
        }  

        sendResponseJson(msg, resCode, res);
    }

    async history(req, res){

        let data = {
            id : req.params.id
        }
        
        let resCode = null;
        let msg     = {};

        let topic = await Topic.getTopicById(data.id);

        if(topic != null){
            
            let prices = await Price.getHistory(topic.id);

            if(prices != null){

                resCode = 200;
                msg     = prices;
            }

        }else{  
            resCode = 400;
            msg     = {
                msg: "No existe."
            };
        }   

        sendResponseJson(msg, resCode, res);
    }
}

module.exports = new PriceController();