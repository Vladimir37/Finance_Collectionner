var model = require('./model');

var periods = {
    day: {
        step: 860000000,
        notes: 5760
    },
    hour: {
        step: 86000000,
        notes: 240
    },
    min30: {
        step: 43000000,
        notes: 120
    },
    min15: {
        step: 43000000,
        notes: 60
    },
    min5: {
        step: 21000000,
        notes: 20
    },
    min: {
        step: 15000000,
        notes: 4
    }
};

function serialize(status, body) {
    body = body || null;
    return {
        status,
        body
    };
}

function response(req, res, next) {
    var symbol = req.query.symbol || 'YHOO';
    var period = req.query.period || 'day';
    if(!periods[period]) {
        return res.send(serialize(1));
    }
    var now_time = +new Date();
    model.findAll({
        where: {
            symbol,
            date: {
                $gt: now_time - periods[period].step
            }
        }
    }).then(function(notes) {
        var candles = [];
        var notes_price = notes.map(function(item) {
            return item.price;
        });
        for(var i = 0; i < notes_price.length; i += periods[period].notes) {
            var current_arr = notes_price.slice(i, i + periods[period].notes);
            var result_obj = {};
            result_obj.date = notes[i].date;
            result_obj.open = current_arr[0];
            result_obj.close = current_arr[current_arr.length - 1];
            result_obj.max = Math.max.apply(null, notes_price);
            result_obj.min = Math.min.apply(null, notes_price);
            candles.push(result_obj);
        }
        return res.send(serialize(0, candles));
    }).catch(function(err) {
        console.log(err);
        return res.send(serialize(1));
    });
}

module.exports = response;