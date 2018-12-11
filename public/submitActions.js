var express = require('express');
var router = express.Router();
var util = require('util');
var api = require('../apiProxy');
var returnModel = require('../model/BaseReturnModel');

router.post('/importAll', function(req, res) {
    console.log('CoinID importAll BEGIN');

    api.getCoinList(function(result) {
        if (result) {
            var apiReturn = new returnModel('success', '匯入成功');
            res.send(apiReturn);
        } else {
            var apiReturn = new returnModel('fail', '匯入失敗');
            res.send(apiReturn);
        }
    });
});

module.exports = router;