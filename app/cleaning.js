var model = require('./model');

function cleaning() {
    var old_date = +new Date() - 30000;
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