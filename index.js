const express = require('express')
const app = express()
const cheerio = require('cheerio');
const axios = require('axios');
var serveStatic = require('serve-static');
app.use(serveStatic(__dirname + "/dist"));
app.get('/api/etf/:ticker', async (req, res) => {
    let responseData = await getHoldings(req.params.ticker)
    res.send(
        responseData)
})


app.listen(process.env.PORT || 3000 )

async function getHoldings(ticker) {
    let url = `http://etfdb.com/etf/${ticker}/`
    //console.log(url)
    let urlHtml = await axios.get(url)
    let $ = cheerio.load(urlHtml.data)
    let partialDataURL = $('ol.holdings-ol table').attr('data-url')
    let dataUrl = `http://etfdb.com/${encodeURI(partialDataURL)}&sort=weight&order=desc&limit=50000&offset=0`
    let dataRes = await axios.get(dataUrl)
    let holdings = dataRes.data.rows.map(((x) => {
        ret = {}
        ret.weight = x.weight
        ret.holding = x.holding.replace(/href=\"\/stock\//, 'href="http://etfdb.com/stock/')
        return ret
    }))

    return holdings

}