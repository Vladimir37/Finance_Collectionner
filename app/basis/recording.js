var fstream = require('finance-stream');

var model = require('./model');
var symbols = require('../../symbols');

function start_recording() {
    fstream.stockTicker(symbols, ['symbol', 'Ask'], 15000).each(function (value) {
        if(value.symbol.slice(-2) == '=X') {
            value.symbol = value.symbol.slice(0, -2);
        }
        model.create({
            symbol: value.symbol,
            date: +new Date(),
            price: parseFloat(value.Ask)
        }).catch(function (err) {
            console.log('ERROR! ' + err);
        });
    });
}

module.exports = start_recording;