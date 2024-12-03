function sendResponseJson(body, statusNumber, res, parseBody = true) {

    if(statusNumber == null){
        statusNumber = 400;
    }

    if(body == null){
        body = {};
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = statusNumber;
    res.end(JSON.stringify(body));        
}

module.exports = {
    sendResponseJson
}