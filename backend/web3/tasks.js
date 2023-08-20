const { companyContract, owner, sendTransaction } = require("./contract");

async function createTask(tId, amount) {
  const txData = companyContract.methods.createTask(tId, amount).encodeABI();
  await sendTransaction(txData);
}

async function removeTask(tId) {
  const txData = companyContract.methods.removeTask(tId).encodeABI();
  await sendTransaction(txData);
}

async function completeTask(user, tId) {
  const txData = companyContract.methods.completeTask(user, tId).encodeABI();
  await sendTransaction(txData);
}

async function getTaskTransactions(tId, limit) {
  let block = await web3.eth.getBlockNumber();
  block = Number(block);
  const events = await companyContract.getPastEvents("TaskTransaction", {
    filter: { tId },
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
  createTask,
  removeTask,
  completeTask,
  getTaskTransactions,
};
