const {
  web3,
  companyContract,
  tokenContract,
  owner,
  sendTransaction,
} = require("./contract");

async function createUser() {
  const account = web3.eth.accounts.create();
  web3.eth.accounts.wallet.add(account.privateKey);

  const txData = companyContract.methods
    .createUser(account.address)
    .encodeABI();
  await sendTransaction(txData);
  return account;
}

async function removeUser(userAddress) {
  const txData = companyContract.methods.removeUser(userAddress).encodeABI();
  await sendTransaction(txData);
}

async function fundUser(userAddress, amount) {
  const txData = companyContract.methods
    .fundUser(userAddress, amount)
    .encodeABI();
  await sendTransaction(txData);
}

async function getUserBalance(userAddress) {
  const result = await tokenContract.methods
    .balanceOf(userAddress)
    .call({ from: owner.address });
  return result;
}

async function stakeTokens(user, amount) {
  const txData = companyContract.methods.stakeTokens(user, amount).encodeABI();
  await sendTransaction(txData);
}

async function unstakeTokens(user, amount) {
  const txData = companyContract.methods
    .unstakeTokens(user, amount)
    .encodeABI();
  await sendTransaction(txData);
}

async function calculateStake(userAddress) {
  const result = await companyContract.methods
    .calculateStake(userAddress)
    .call({ from: owner.address });
  return result;
}

async function getUserTransactions(userAddress) {
  const events = await companyContract.getPastEvents("Transaction", {
    filter: { sender: userAddress, receiver: userAddress },
    fromBlock: 0,
    toBlock: "latest",
  });
  return events;
}

module.exports = {
  createUser,
  removeUser,
  fundUser,
  getUserBalance,
  stakeTokens,
  unstakeTokens,
  calculateStake,
  getUserTransactions,
};
