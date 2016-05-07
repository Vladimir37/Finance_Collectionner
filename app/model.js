var Sequelize = require('sequelize');

var db_config = require('../config');

var sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: db_config.storage,
    logging: false
});

sequelize.authenticate().then(function() {
    console.log('Connect to DB created!');
}, function(err) {
    console.log('Connection error: ' + err);
});

var Symbols = sequelize.define('symbols', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    symbol: Sequelize.STRING,
    date: Sequelize.INTEGER,
    price: Sequelize.FLOAT
});

Symbols.sync().then(function(result) {
    console.log('Table successfully synchronized');
}).catch(function(err) {
    console.log('Error: ' + err);
});

module.exports = Symbols;