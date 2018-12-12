var mongoose = require('../mongo-connect');

var CoinSchema = new mongoose.Schema({
    token_rank: { type: Number },
    token_name: { type: String },
    token_symbol: { type: String },
    token_img_url: { type: String },
    token_is_active: { type: Boolean }
});

module.exports = mongoose.model('tb_coin_list', CoinSchema);