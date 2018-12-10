var express = require('express');
var router = express.Router();
var util = require('util');
var render = require('../server-render');

router.get('/', function(req, res) {
    console.log('API get coins BEGIN');
    res.send(render.importCoinIds());
});

module.exports = router;