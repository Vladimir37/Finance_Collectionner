var app = require('./app/app');
var recording = require('./app/basis/recording');
var cleaning = require('./app/basis/cleaning');
var config = require('./config');

recording();
setInterval(cleaning, 86400000);

app.listen(config.port);