var schedule = require('node-schedule');
var coin = require('./model/CoinSchemaModel');
var api = require('./apiProxy');
var price = require('./model/PriceSchemaModel');

module.exports = {
    crawler: function() {
        //每天的23:59:00 開始執行排程
        schedule.scheduleJob('0 59 23 * * *', function() {
            //1. 取出Token List
            coin.getTokenList().then(result => {
                //console.log(result);
                for (var i = 0; i < result.length; i++) {
                    //2. 取得Info
                    api.getCoinInfo(result[i].token_symbol).then(info => {
                        //console.log("info = " + info);
                        //3. 存入DB
                        price.saveHistoricalPrice(info);
                    })
                }
            })
        })
    }
}