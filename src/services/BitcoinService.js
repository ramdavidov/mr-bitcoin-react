import axios from 'axios'
import moment from 'moment'

async function getRate(coins = 1) {
    try {
        const res = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
        return res.data
    } catch (err) {
        console.log('ERROR:', err)
    }
}

async function getMarketPrice() {
    try {
        const res = await axios.get('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
        const data = res.data.values.map(value => {
            return [_formatDate(value.x * 1000), value.y]
        })
        return data
    } catch(err) {
        console.log('ERROR:', err)
    }
}
async function getTradeVolume() {
    try {
        const res = await axios.get('https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true')
        const data = res.data.values.map(value => {
            return [_formatDate(value.x * 1000), value.y]
        })
        return data
    } catch(err) {
        console.log('ERROR:', err)
    }
}

function _formatDate(timeStamp) {
    return moment(timeStamp).format("MMM Do YY")
}

export const BitcoinService = {
    getRate,
    getMarketPrice,
    getTradeVolume
}