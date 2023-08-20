const mongoose = require("mongoose");

const { create } = require("./controllers/user.js");
const { getUserBalance, fundUser } = require("./web3/user.js");
const { createTask, completeTask } = require("./web3/tasks.js");
const { createReward } = require("./web3/rewards.js");

async function main() {
  await mongoose.connect(process.env.MONGO_DB_URL);

  const userAddress = "0xFA370fE5fFfCfcEc3db78587db7E62944AD883dE";

  await createTask("1001", 10);

  const balance = await getUserBalance(userAddress);
  console.log(balance);
}

main();
