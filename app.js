// .env file
require('dotenv').config();

// MODULOS
const express = require('express');

const app = express();

app.use(express.json());

//  RUTAS
const rutas = require('./routes/index');
rutas.addRutas(app);

//  DATA BASE
const { testConnection } = require('./database/connection');

testConnection();


module.exports = app;