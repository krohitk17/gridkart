require("dotenv").config();
const { Web3 } = require("web3");

const contractABI = require("../bin/blockchain/contracts/TokenContract.abi");
const contractAddress = process.env.REACT_APP_COMPANY_CONTRACT_ADDRESS;

const web3 = new Web3(process.env.PROVIDER_URL);

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Account private key and address
const privateKey = process.env.OWNER_PRIVATE_KEY;
const accountAddress = process.env.OWNER_ADDRESS;

const gasPrice = "10000000000"; // Replace with your desired gas price

async function sendTransaction(transaction) {
  const txCount = await web3.eth.getTransactionCount(accountAddress);
  const gasLimit = await transaction.estimateGas({ from: accountAddress });

  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: contractAddress,
      data: transaction.encodeABI(),
      gas: gasLimit,
      gasPrice: gasPrice,
      nonce: txCount,
    },
    privateKey
  );

  return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
}

async function createUser(userAddress, userType) {
  const contractFunction = contract.methods.createUser(userAddress, userType);
  await sendTransaction(contractFunction);
}

async function createReward(rId, value) {
  const contractFunction = contract.methods.createReward(rId, value);
  await sendTransaction(contractFunction);
}

async function fundUser(userAddress, amount) {
  const contractFunction = contract.methods.fundUser(userAddress, amount);
  await sendTransaction(contractFunction);
}

async function rewardUser(userAddress, amount) {
  const contractFunction = contract.methods.rewardUser(userAddress, amount);
  await sendTransaction(contractFunction);
}

async function redeemReward(rId) {
  const contractFunction = contract.methods.redeemReward(rId);
  await sendTransaction(contractFunction);
}

async function getReward(rId) {
  return contract.methods.getReward(rId).call();
}

// Call the functions here
