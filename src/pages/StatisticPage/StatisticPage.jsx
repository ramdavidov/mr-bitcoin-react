import React, { Component } from 'react'
import { BitcoinService } from '../../services/BitcoinService';
import LoadingCmp from '../../cmps/LoadingCmp/LoadingCmp'

import { Chart } from "react-google-charts";

export default class StatisticPage extends Component {
    state = {
        marketPrice: [],
        tradeVolume: []
    }

    componentDidMount() {
        this.getMarketPrice()
        this.getTradeVolume()
    }

    getMarketPrice = async () => {
        const marketPrice = await BitcoinService.getMarketPrice()
        this.setState({ marketPrice: marketPrice })
    }

    getTradeVolume = async () => {
        const tradeVolume = await BitcoinService.getTradeVolume()
        this.setState({ tradeVolume: tradeVolume })
    }

    render() {
        const { marketPrice, tradeVolume } = this.state
        return (
            <div>
                <h1>StatisticPage!</h1>
                {marketPrice.length && <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="AreaChart"
                    loader={<LoadingCmp />}
                    data={[['Date', 'USD'], ...marketPrice]}
                    options={{
                        title: 'Market Price (USD)',
                        hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
                        vAxis: { minValue: 0 },
                        chartArea: { width: '50%', height: '70%' },
                    }}
                />}
                {tradeVolume.length && <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="AreaChart"
                    loader={<LoadingCmp />}
                    data={[['Date', 'USD'], ...tradeVolume]}
                    options={{
                        title: 'Confirmed Transactions Per Day',
                        hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
                        vAxis: { minValue: 0 },
                        chartArea: { width: '50%', height: '70%' },
                    }}
                />}
            </div>
        )
    }
}
