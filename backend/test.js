const mongoose = require("mongoose");

const userController = require("./controllers/user.js");
const eventController = require("./controllers/event.js");

const { approve } = require("./web3/contract.js");

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

main();
