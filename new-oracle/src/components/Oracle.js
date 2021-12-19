import { Component } from 'react'
import { STOCK_ORACLE_ABI, STOCK_ORACLE_ADDRESS } from "./quotecontract";
import Web3 from "web3"


// web3 variables
const web3 = new Web3("http://localhost:7545")   // connect to ganache
var accounts
var stockQuote

// init web3
let InitWeb3 = async () => {
    // setup accounts
    accounts = await web3.eth.getAccounts()
    console.log("Account 0 = ", accounts[0])

    // create new contract instance
    stockQuote = new web3.eth.Contract(
        STOCK_ORACLE_ABI,
        STOCK_ORACLE_ADDRESS
    )

    console.log("Contract Address = " + stockQuote._address)
}

InitWeb3()





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
            changePercent: "",
            priceFromContract: "",
            volumeFromContract: ""
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

            // update the datas to deployed contract
            this.setDataToContract()

        })
        .catch(console.log)
    }
    




    setDataToContract = async () => {


        console.log("symbol in hex: " + web3.utils.fromAscii(this.state.symbol))
        console.log("price: " + Math.round(parseInt(this.state.price)))
        console.log("volume: " + Math.round(parseInt(this.state.volume)))
        
        // call setStock function from contract
        // solidity dont support float
        await stockQuote.methods
        .setStock(
            web3.utils.fromAscii(this.state.symbol), 
            web3.utils.toBN((parseInt(this.state.price))), 
            web3.utils.toBN((parseInt(this.state.volume)))
        )
        .send({from: accounts[0]}, (error, transactionHash) => {
            console.log("transactionHash: " + transactionHash)

        }) // send will alter the contract's state, must have 'from' param

    }




    getDataFromContract = async () => {

        // call contract function
        // get stock price
        let price = await stockQuote.methods
        .getStockPrice(web3.utils.fromAscii("MSFT"))
        .call() // call will not alter the contract's state

        // get stock volume
        let volume = await stockQuote.methods
        .getStockVolume(web3.utils.fromAscii("MSFT"))
        .call() 

        // set state variable
        this.setState({
            priceFromContract: price,
            volumeFromContract: volume
        })

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

                {/* <button onClick={this.setDataToContract}>Set data to contract</button> */}
                <button onClick={this.getDataFromContract}>Get data from contract</button>
                <h3>Price From Contract={this.state.priceFromContract}</h3>
                <h3>Volume From Contract={this.state.volumeFromContract}</h3>

            </div>
        )
    }
}


