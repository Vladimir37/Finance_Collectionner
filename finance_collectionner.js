var recording = require('./app/recording');
var cleaning = require('./app/cleaning');

recording();
setInterval(cleaning, 86400000);