var rp = require('request-promise');
var util = require('util');
var model = require('./model/CoinSchemaModel');
var priceModel = require('./model/PriceSchemaModel');

var coin_base_url = "https://pro-api.coinmarketcap.com/";
var endPoint_list_last = "v1/cryptocurrency/listings/latest?limit=100";
var endPoint_coin_data = "v1/cryptocurrency/quotes/latest"

module.exports = {
    getCoinList: async function(callback) {
        var options = {
            method: 'GET',
            uri: coin_base_url + endPoint_list_last,
            headers: {
                'X-CMC_PRO_API_KEY': 'a81f48d4-1d42-4eb4-b0e2-9531ab7542b2'
            },
            json: true
        };

        var res = await rp(options).then(function(body) {
            //console.log(util.inspect(body, false, null));
            var dataString = JSON.stringify(body);
            var data = JSON.parse(dataString);
            if (data.data.length > 0) {

                for (var i = 0; i < data.data.length; i++) {
                    var tokenList = [];
                    var basicTokenInfo = {
                        token_is_active: true,
                        token_rank: data.data[i].cmc_rank,
                        token_img_url: "",
                        token_name: data.data[i].name,
                        token_symbol: data.data[i].symbol
                    }
                    tokenList.push(basicTokenInfo);

                    model.saveTokens(tokenList);
                }
            }

            return true;
        }).catch(function(err) {
            console.log('err = ' + err);
            return false;
        });

        callback(res);
    },

    getCoinInfo: async function(symbol) {
        var options = {
            method: 'GET',
            uri: coin_base_url + endPoint_coin_data + "?symbol=" + symbol,
            headers: {
                'X-CMC_PRO_API_KEY': 'a81f48d4-1d42-4eb4-b0e2-9531ab7542b2'
            },
            json: true
        };

        return await rp(options).then(function(body) {
            //console.log(util.inspect(body, false, null));
            var dataString = JSON.stringify(body);
            var data = JSON.parse(dataString);
            var i = data.data[Object.keys(data.data)[0]];
            var tokenObj = {
                token_rank: i.cmc_rank,
                token_name: i.name,
                token_symbol: i.symbol,
                token_price_usd: i.quote.USD.price,
                token_percent_change_1h: i.quote.USD.percent_change_1h,
                token_percent_change_24h: i.quote.USD.percent_change_24h,
                token_percent_change_7d: i.quote.USD.percent_change_7d,
                date: new Date(Date.now()).toLocaleString()
            }
            return tokenObj;
        }).catch(function(err) {
            console.log('err = ' + err);
            return null;
        });
    }
}