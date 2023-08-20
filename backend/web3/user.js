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

async function unstakeTokens(user) {
  const txData = companyContract.methods.unstakeTokens(user).encodeABI();
  await sendTransaction(txData);
}

async function calculateStake(userAddress) {
  const result = await companyContract.methods
    .calculateStake(userAddress)
    .call({ from: owner.address });
  return result;
}

async function getUserTransactions(userAddress, limit) {
  let block = await web3.eth.getBlockNumber();
  block = Number(block);
  const senderEvents = await companyContract.getPastEvents("Transaction", {
    filter: { receiver: userAddress },
    fromBlock: block - 10000,
    toBlock: block,
    limit: limit,
  });
  const receiverEvents = await companyContract.getPastEvents("Transaction", {
    filter: { sender: userAddress },
    fromBlock: block - 10000,
    toBlock: block,
    limit: limit,
  });

  const events = [...senderEvents, ...receiverEvents];

  return Promise.all(
    events
      .map(async (event) => {
        const neg = event.returnValues.sender === userAddress ? -1 : 1;
        console.log(event.returnValues.sender, userAddress, neg);
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
