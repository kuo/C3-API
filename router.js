module.exports = function(app) {
    var coin = require('./public/coins');
    app.use('/public/coins', coin);

    var submitAction = require('./public/submitActions');
    app.use('/public/submitActions', submitAction);
};