const { Web3 } = require("web3");
const web3 = new Web3();

const newAccount = web3.eth.accounts.create();
console.log("New account address:", newAccount.address);
console.log("Private key:", newAccount.privateKey);
