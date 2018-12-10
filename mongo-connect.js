var mongoose = require('mongoose');
//mongoose.connect('mongodb://Admin:henry2270@ds147534.mlab.com:47534/ico-center', { useNewUrlParser: true });
mongoose.connect('mongodb://127.0.0.1:27017/iio_db', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('we are connected!');
});

module.exports = mongoose;