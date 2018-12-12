var token = require('./CoinSchema');

module.exports = {

    saveTokens: function(tokenList) {

        token.deleteMany({}, function(err) {
            if (!err) {
                token.insertMany(tokenList);
            }
        })
    },

    getTokenList: async function() {
        var query = {
            token_is_active: true
                //token_rank: { '$lte': 10 }
        };
        return await token.find(query).exec();
    },

    getTokenSymbol: async function() {
        return await token.find({}, { "token_symbol": 1, "_id": 0 }).exec();
    }
}