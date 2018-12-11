var express = require('express');
var router = express.Router();
var util = require('util');
var render = require('../server-render');
var api = require('../apiProxy');
var returnModel = require('../model/BaseReturnModel');

router.get('/', function(req, res) {
    console.log('API get coins BEGIN');
    res.send(render.importCoinIds());
});

router.get('/tokenInfo', function(req, res) {
    console.log('API get tokenInfo BEGIN, query symbol = ' + req.query.symbol);
    api.getCoinInfo(req.query.symbol).then(result => {
        console.log("result = " + util.inspect(result, false, null));
        if (result != null) {
            var apiReturn = new returnModel('success', result);
            res.send(apiReturn);
        } else {
            var apiReturn = new returnModel('fail', 'invalid data');
            res.send(apiReturn);
        }
    });
});

module.exports = router;