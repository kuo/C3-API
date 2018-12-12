var express = require('express');
var router = express.Router();
var util = require('util');
var api = require('../apiProxy');
var returnModel = require('../model/BaseReturnModel');
var coin = require('../model/CoinSchemaModel');

router.post('/importAll', function(req, res) {
    console.log('CoinID importAll BEGIN');

    api.getCoinList().then(tokenList => {
        coin.saveTokens(tokenList);
        var apiReturn = new returnModel('success', '匯入成功');
    })
});

module.exports = router;