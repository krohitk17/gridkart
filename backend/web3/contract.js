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
  const block = await web3.eth.getBlockNumber();
  console.log(block);
  const events = await companyContract.getPastEvents("Transaction", {
    fromBlock: Number(block) - 10000,
    toBlock: block,
  });

  return Promise.all(
    events
      .map(async (event) => {
        const neg =
          event.returnValues.sender === companyContractAddress ? -1 : 1;
        const eventBlock = await web3.eth.getBlock(event.blockNumber);
        return {
          hash: event.transactionHash,
          sender: event.returnValues.sender,
          receiver: event.returnValues.receiver,
          amount: Number(event.returnValues.amount) * neg,
          timestamp: Number(eventBlock.timestamp),
        };
      })
      .sort((a, b) => a.timestamp - b.timestamp)
  );
}

async function getContractBalance() {
  const result = await tokenContract.methods
    .balanceOf(companyContractAddress)
    .call({ from: owner.address });
  return Number(result);
}

async function approve(userAddress, amount, privateKey) {
  const txData = tokenContract.methods
    .approve(companyContractAddress, amount)
    .encodeABI();

  const nonce = await web3.eth.getTransactionCount(userAddress);
  const gasPrice = await web3.eth.getGasPrice();

  const tx = {
    from: userAddress,
    to: tokenContractAddress,
    nonce: nonce,
    gas: 300000,
    gasPrice: gasPrice,
    data: txData,
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

  const result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
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
  getContractBalance,
  approve,
};
