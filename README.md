
# Solclout Assessment

A node / web3 server that sends ETH from the system to a provided ETH address

## Environment Variables

To run this project, create a .env file in the root folder & add the following environment variables.

`EthNodeUrl` (the address to you ethereum node)

`EthNetworkChain` (your ethereum chain, defaults to **mainnet**)

`EthNetworkHardfork` (your ethereum hardfork, defaults to **london**)

`EthWalletAddress` (The ethereum wallet address from which the server would send ethereum)

`EthPrivateKey` (The private key of the ethereum wallet)

`PORT` (defaults to 5000. should not be set in production servers)


## Run Locally

Clone the repo

```bash
  git@github.com:Sh3riff/SolClout_Assessment_Server.git
```

Go to the project directory

```bash
  cd SolClout_Assessment_Server
```

Install dependencies

```bash
  npm i
```

Start the server

```bash
  npm start
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## API Reference

#### Transfer Ethereum

```http
  POST /transferETH
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `receivingADDRESS` | `string` | **Required**. ETH address of the reciever |
| `amountToSendInETH` | `string` | **Required**. Amount to send in ETH |

#### Server Documentation

```http
  GET /docs
```

#### The swagger documentation is also available @ '/docs' of the server url i.e [http://localhost:5000/docs](http://localhost:5000/docs) for local host running on port 5000



## Tech Stack

**Server:** [Node](https://nodejs.org/en/), [Express](https://www.npmjs.com/package/express),  [web3](https://www.npmjs.com/package/web3)


## Author

- [@sh3riff](https://github.com/sh3riff)

