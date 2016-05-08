var restify = require('restify');

var response = require('./basis/response');

var server = restify.createServer();
server.use(restify.queryParser());
server.get('/', response);

module.exports = server;
