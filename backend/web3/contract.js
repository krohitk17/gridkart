const { Web3 } = require("web3");
const web3 = new Web3();
require("dotenv").config();

web3.setProvider(process.env.PROVIDER_URL);

const { CompanyContract, TokenContract } = require("../blockchain/exports");

const companyContractAddress = process.env.COMPANY_CONTRACT_ADDRESS;
const tokenContractAddress = process.env.TOKEN_CONTRACT_ADDRESS;
const owner = {
  address: process.env.OWNER_ADDRESS,
  privateKey: process.env.OWNER_PRIVATE_KEY,
};

console.log(companyContractAddress, tokenContractAddress, owner);

const companyContract = new web3.eth.Contract(
  CompanyContract.abi,
  companyContractAddress
);
const tokenContract = new web3.eth.Contract(
  TokenContract.abi,
  tokenContractAddress
);

async function getAllTransactions() {
  const events = await companyContract.getPastEvents("Transaction", {
    fromBlock: 0,
    toBlock: "latest",
  });
  return events;
}

async function sendTransaction(txData) {
  try {
    const nonce = await web3.eth.getTransactionCount(owner.address);
    const gasPrice = await web3.eth.getGasPrice();

    const tx = {
      from: owner.address,
      to: companyContractAddress,
      nonce: nonce,
      gas: 300000,
      gasPrice: gasPrice,
      data: txData,
    };

    const signedTx = await web3.eth.accounts.signTransaction(
      tx,
      owner.privateKey
    );

    const result = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    console.log("Transaction hash:", result.transactionHash);
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
}

module.exports = {
  web3,
  companyContract,
  tokenContract,
  owner,
  getAllTransactions,
  sendTransaction,
};
