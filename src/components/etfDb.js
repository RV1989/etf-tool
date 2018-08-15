
const axios = require('axios');

export async function getHoldings(ticker){
    let url = `/api/etf/${ticker}/`
    //console.log(url)
    let urlHtml = await axios.get(url)
    let holdings =urlHtml.data
    return holdings

}
