const { companyContract, owner } = require("./contract");

async function createReward(rId, amount) {
  const result = await companyContract.methods
    .createReward(rId, amount)
    .send({ from: owner });
  return result;
}

async function removeReward(rId) {
  const result = await companyContract.methods
    .removeReward(rId)
    .send({ from: owner });
  return result;
}

async function redeemReward(user, rId) {
  const result = await companyContract.methods
    .redeemReward(user, rId)
    .send({ from: owner });
  return result;
}

module.exports = {
  createReward,
  removeReward,
  redeemReward,
};
