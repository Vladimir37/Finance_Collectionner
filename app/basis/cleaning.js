var model = require('./model');
var config = require('../../config');

function cleaning() {
    var old_date = +new Date() - config.limit;
    model.destroy({
        where: {
            date: {
                $lt: old_date
            }
        }
    }).then(function() {
        console.log('Cleaning...');
    }).catch(function(err) {
        console.log(err);
    });
}

module.exports = cleaning;