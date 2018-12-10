var cheerio = require('cheerio');

module.exports = {

    importCoinIds: function() {
        var view = `<!DOCTYPE html>
        <html>
        
        <body>
            <hr>
            <p>Coin ID 匯入</p>
            <form id="form" method="post" action="/public/submitActions/importAll">
                <br><input type="submit" value="匯入">
            </form>
            <hr>
        
        
        </body>
        
        </html>`;

        var $ = cheerio.load(view);
        return $.html();
    }
}