export const STOCK_ORACLE_ADDRESS = '0xfd0c73852b6fE8517C4C3727fb98674797cC3784'
export const STOCK_ORACLE_ABI = [
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "symbol",
                "type": "bytes4"
            }
        ],
        "name": "getStockPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "symbol",
                "type": "bytes4"
            }
        ],
        "name": "getStockVolume",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "symbol",
                "type": "bytes4"
            },
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "volume",
                "type": "uint256"
            }
        ],
        "name": "setStock",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

]