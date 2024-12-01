const app = require('./app');

const http = require('http');

const PORT = process.env.PORT;

const server = http.createServer(app);

app.set('port', PORT);

server.listen(PORT);

console.log(`Servidor publicado en el puesto ${PORT}`);