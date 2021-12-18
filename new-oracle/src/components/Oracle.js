import React, { Component } from 'react'


export default class Oracle extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            quote: "",
            symbol: "",
            open: "",
            high: "",
            low: "",
            price: "",
            volume: "",
            latestTradingDay: "",
            previousClose: "",
            change: "",
            changePercent: ""
        }


    }

    
    GetPrice = async () => {
        // get stock price from alphavantage
        await fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=${process.env.REACT_APP_API_KEY}`
        )
        .then((res) => res.json())
        .then((data) => {
            this.setState({ quote: data })
            
            this.setState({ 
                symbol: data["Global Quote"]["01. symbol"], 
                open: data["Global Quote"]["02. open"],
                high: data["Global Quote"]["03. high"],
                low: data["Global Quote"]["04. low"],
                price: data["Global Quote"]["05. price"],
                volume: data["Global Quote"]["06. volume"],
                latestTradingDay: data["Global Quote"]["07. latest trading day"],
                previousClose: data["Global Quote"]["08. previous close"],
                change: data["Global Quote"]["09. change"],
                changePercent: data["Global Quote"]["10. change percent"]
            })
        })
        .catch(console.log)


    }
    
    render() {
        return (
            <div>
                <button onClick={this.GetPrice}>Get Price</button>

                <h3>symbol={this.state.symbol}</h3>
                <h3>open={this.state.open}</h3>
                <h3>high={this.state.high}</h3>
                <h3>low={this.state.low}</h3>
                <h3>price={this.state.price}</h3>
                <h3>volume={this.state.volume}</h3>
                <h3>latestTradingDay={this.state.latestTradingDay}</h3>
                <h3>previousClose={this.state.previousClose}</h3>
                <h3>change={this.state.change}</h3>
                <h3>changePercent={this.state.changePercent}</h3>
            </div>
        )
    }
}


