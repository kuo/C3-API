var mongoose = require('../mongo-connect');

var PriceSchema = new mongoose.Schema({
    token_rank: { type: Number },
    token_name: { type: String },
    token_symbol: { type: String },
    token_price_usd: { type: Number },
    token_percent_change_1h: { type: Number },
    token_percent_change_24h: { type: Number },
    date: { type: String }
});

module.exports = mongoose.model('tb_coin_price', PriceSchema);