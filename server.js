require('dotenv').config();
const path = require('path')
const express= require('express')
const cors = require('cors');
const Web3 = require('web3');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocs = YAML.load(path.resolve(__dirname, './swagger.yaml'))

const expressServer = () => {
  const app = express()

  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }))
  
  const {EthNodeUrl, EthNetworkChain, EthNetworkHardfork, EthWalletAddress, EthPrivateKey} = process.env
  
  // routes

  app.get('/test', (req, res) => res.json({message: "Server running"}))
  
  app.post('/transferETH', async (req, res) => {
    const {receivingADDRESS, amountToSendInETH} =  req.body
  
    if (!receivingADDRESS || !amountToSendInETH) {
      return res.status(400).json({message: 'missing required parameter'})
    }
    const ETH_2_Wei = 10 ** 18
    const amountToSendINWei = amountToSendInETH * ETH_2_Wei
  
    const web3 = new Web3(EthNodeUrl)
    web3.eth.defaultAccount = EthWalletAddress
  
    try {
      const balanceInWei = await web3.eth.getBalance(EthWalletAddress)
      const formattedBalanceInWei = parseInt(balanceInWei)
  
      // insuffient balance
      if (amountToSendINWei > formattedBalanceInWei) {
        return res.status(400).json({message: 'insuffient balance'})
      }
  
      const nonce = await web3.eth.getTransactionCount(EthWalletAddress)
      const transaction = {
        to: receivingADDRESS,
        value: amountToSendINWei,
        nonce,
        gas: 21000,
        chain: EthNetworkChain || 'mainnet',
        hardfork: EthNetworkHardfork || 'london'
      };
      const {rawTransaction} = await web3.eth.accounts.signTransaction(transaction, EthPrivateKey)
      await web3.eth.sendSignedTransaction(rawTransaction)
      return res.json({message: 'transaction successful'})
    } catch (error) {
      res.status(400).json({message: error?.message})
    }
  })

  return app

}

module.exports = expressServer
