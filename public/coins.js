var express = require('express');
var router = express.Router();
var util = require('util');
var render = require('../server-render');
var api = require('../apiProxy');
var returnModel = require('../model/BaseReturnModel');
var price = require('../model/PriceSchemaModel');
var coin = require('../model/CoinSchemaModel');

/** 
 * Token 匯入頁面
 */
router.get('/', function(req, res) {
    console.log('API get coins BEGIN');
    res.send(render.importCoinIds());
});

/** 
 * 取得此token目前value
 */
router.get('/tokenInfo/last', function(req, res) {
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

/** 
 * 取得此token於一段時間內的value
 */
router.get('/tokenInfo/historical', function(req, res) {
    console.log('API get tokenInfo BEGIN, query symbol = ' + req.query.symbol);
    console.log('query days = ' + req.query.days);

    price.getHistoricalInfo(req.query.symbol, req.query.days).then(result => {
        //console.log("result = " + util.inspect(result, false, null));
        if (result != null) {
            var apiReturn = new returnModel('success', result);
            res.send(apiReturn);
        } else {
            var apiReturn = new returnModel('fail', 'invalid data');
            res.send(apiReturn);
        }
    });

});

/** 
 * 目前支援的tokens
 */
router.get('/tokenInfo/support', function(req, res) {
    coin.getTokenList().then(result => {
        //console.log("result = " + util.inspect(result, false, null));
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