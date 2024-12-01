const express = require('express');

// RUTAS
const topicRouter = require('./topic');

const indexRouter = express.Router();

function addRutas(app){

  app.use('/', indexRouter);
  app.use('/topic', topicRouter);
}

// Main route
indexRouter.get('/', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ "msg": "Welcome to the my API REST.." }));   
});

module.exports = {
  addRutas
};