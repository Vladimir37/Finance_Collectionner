var fstream = require('finance-stream');

var model = require('./model');

function start_recording() {
    fstream.stockTicker(['YHOO', 'GOOG'], ['symbol', 'Ask'], 5000).each(function (value) {
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