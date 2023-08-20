const mongoose = require("mongoose");

const userController = require("./controllers/user.js");
const eventController = require("./controllers/event.js");

const { approve } = require("./web3/contract.js");

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);

  await approve(
    "0xE321Ffe4a140EFf8DCFDBA45D5deDA96C6468a5A",
    100000,
    "0x92dcc476a4d28023d502114a415c0ed69eb81317c54520115a73d932fb51e31e"
  );

  await approve(
    "0xCbC34f1adB321A0e2683109Fa75c5f0853384EB9",
    100000,
    "0x9392e85bcd379c5e8911ca8ca7b2f2804f4e42257b618e288895e72964219e5c"
  );

  await approve(
    "0xd1Fc9FEac727e8d22170CD2c92b04c00Fe633a58",
    100000,
    "0x633c8cad0cb10ad14e5f0260b3adaf0dc52b5bfe5ae388282f107b1ad12a7f7b"
  );
}

main();
