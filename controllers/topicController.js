const Topic = require('../models/topic');
const { sendResponseJson } = require('../utils/responseHandler');

class TopicController{

    constructor(){

    };

    create(req, res){

        let data = {
            name : req.body.name
        }
        
        let resCode = null;
        let msg     = null;

        let topic = new Topic(data.name);

        if(topic.create()){

            resCode = 201;
            msg     = "OK"; 
        }else{  
            resCode = 400;
            msg     = "ups!!";
        }   

        sendResponseJson(msg, resCode, res);
    }

    async get(req, res){

        let data = {
            id : req.params.id
        }
        
        let resCode = null;
        let msg     = null;

        let topic = await Topic.getTopicById(data.id);

        if(topic != null){
            
            resCode = 200;
            msg     = topic.toPublicData();

        }else{  
            resCode = 400;
            msg     = {
                msg: "No existe."
            };
        }   

        sendResponseJson(msg, resCode, res);
    }
    
    async delete(req, res){

        let data = {
            id : req.params.id
        }

        let resCode = null;
        let msg     = null;

        let topic = await Topic.getTopicById(data.id);

        if(topic != null){
            
            if(topic.delete()){
                
                resCode = 200;
                msg     = "Topic deleted.";
            }else{
                
            }

        }else{  
            resCode = 400;
            msg     = {
                msg: "No existe."
            };
        } 

        sendResponseJson(msg, resCode, res);
    }

    async update(req, res){

        let data = {
            id : req.body.id,
            name : req.body.name
        }

        let resCode = null;
        let msg     = null;

        let topic = await Topic.getTopicById(data.id);

        if(topic != null){
            
            topic.setName(data.name);

            if(topic.update()){
                
                resCode = 200;
                msg     = "Topic updated.";
            }            

        }else{  
            
            resCode = 400;
            msg     = {
                msg: "No existe."
            };
        } 

        sendResponseJson(msg, resCode, res);
    }

    async getAll(req, res){
        
        let resCode = null;
        let body     = null;

        let topics = await Topic.getAll();

        if(topics != null){

            resCode = 200;
            body = topics;
        }

        sendResponseJson(body, resCode, res);
    }
}

module.exports = new TopicController();