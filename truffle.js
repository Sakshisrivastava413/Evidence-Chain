// Allows us to use ES6 in our migrations and tests.
require('babel-register')

var WalletProvider = require("truffle-wallet-provider");

// Read and unlock keystore
// var keystore = require('fs').readFileSync("./naveen_gyan_wallet").toString();
// var pass = "1milLion4"
// var wallet = require('ethereumjs-wallet').fromV3(keystore, pass);

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 7545,
      network_id: '*' // Match any network id
    },
    gyaan: {
      provider: () => { return new WalletProvider(wallet, "http://gyaan.network:8545") },
      gas: "4600000",
      network_id: "17"
    },
    rinkeby: {
      provider: () => { return new WalletProvider(wallet, "https://rinkeby.infura.io/8oq8UZYB0lexxrdem244") },
      gas: "4600000",
      network_id: "*"
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
};
