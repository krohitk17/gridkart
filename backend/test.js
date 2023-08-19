const { Web3 } = require("web3");
const web3 = new Web3(
  "https://light-restless-haze.matic-testnet.discover.quiknode.pro/8542f6c2096998b9a7150f3dbbef64fbb70338e6/"
);
web3.eth.getBlock("latest").then((answer) => console.log(answer));
web3.eth.getBlockNumber().then((blockNum) => console.log(blockNum));
