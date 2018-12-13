var price = require('./PriceSchema');

module.exports = {
    saveHistoricalPrice: function(obj) {

        var p = new price({
            token_rank: obj.token_rank,
            token_name: obj.token_name,
            token_symbol: obj.token_symbol,
            token_price_usd: obj.token_price_usd,
            token_percent_change_24h: obj.token_percent_change_24h,
            date: obj.date
        })

        p.save(function(err, res) {});
    },

    getHistoricalInfo: async function(symbol, days) {
        return await price.find({ token_symbol: symbol }).limit(parseInt(days)).exec();
    }
}