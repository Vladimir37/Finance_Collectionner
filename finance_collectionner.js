var app = require('./app/app');
var recording = require('./app/basis/recording');
var cleaning = require('./app/basis/cleaning');

recording();
setInterval(cleaning, 86400000);

app.listen(49005);