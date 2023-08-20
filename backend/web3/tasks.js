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

async function getTaskTransactions(tId) {
  const events = await companyContract.getPastEvents("Transaction", {
    filter: { tId: tId },
    fromBlock: 0,
    toBlock: "latest",
  });
  return events;
}

module.exports = {
  createTask,
  removeTask,
  completeTask,
  getTaskTransactions,
};
