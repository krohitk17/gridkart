const { companyContract, sendTransaction } = require("./contract");

async function createReward(rId, amount) {
  const txData = companyContract.methods.createReward(rId, amount).encodeABI();
  await sendTransaction(txData);
}

async function removeReward(rId) {
  const txData = companyContract.methods.removeReward(rId).encodeABI();
  await sendTransaction(txData);
}

async function redeemReward(user, rId) {
  const txData = companyContract.methods.redeemReward(user, rId).encodeABI();
  await sendTransaction(txData);
}

async function getRewardTransactions(rId, limit) {
  let block = await web3.eth.getBlockNumber();
  block = Number(block);
  const events = await companyContract.getPastEvents("RewardTransaction", {
    filter: { rId },
    fromBlock: block - limit,
    toBlock: block,
  });

  return Promise.all(
    events
      .map(async (event) => {
        const eventBlock = await web3.eth.getBlock(event.blockNumber);
        return {
          sender: event.returnValues.sender,
          receiver: event.returnValues.receiver,
          amount: event.returnValues.amount,
          timestamp: eventBlock.timestamp,
        };
      })
      .sort((a, b) => b.timestamp - a.timestamp)
  );
}

module.exports = {
  createReward,
  removeReward,
  redeemReward,
  getRewardTransactions,
};
