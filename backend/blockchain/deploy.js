const { Web3 } = require("web3");
const fs = require("fs");
require("dotenv").config();

// Connect to an Ethereum node
const web3 = new Web3(process.env.PROVIDER_URL);

// Load the contract ABI and bytecode
const TokenContractABI = JSON.parse(
  fs.readFileSync("./blockchain/bin/TokenContract.abi", "utf8")
);
const TokenContractBytecode =
  "0x" + fs.readFileSync("./blockchain/bin/TokenContract.bin", "utf8");

const CompanyContractABI = JSON.parse(
  fs.readFileSync("./blockchain/bin/CompanyContract.abi", "utf8")
);
const CompanyContractBytecode =
  "0x" + fs.readFileSync("./blockchain/bin/CompanyContract.bin", "utf8");

// Create a contract instance
const TokenContract = new web3.eth.Contract(TokenContractABI);
const CompanyContract = new web3.eth.Contract(CompanyContractABI);

web3.eth.accounts.wallet.add(process.env.OWNER_PRIVATE_KEY);

let TokenContractAddress = "";

async function deployTokenContract() {
  const TokenContractDeployed = await TokenContract.deploy({
    data: TokenContractBytecode,
    arguments: [process.env.TOKEN_NAME, process.env.TOKEN_SYMBOL],
  })
    .send({
      from: web3.eth.accounts.wallet[0].address,
      gas: 3000001,
      gasPrice: 30000000000,
    })
    .then((newContractInstance) => {
      TokenContractAddress = newContractInstance.options.address;
      console.log(newContractInstance.options.address);
    });

  fs.appendFileSync(
    "./.env",
    `REACT_APP_TOKEN_CONTRACT_ADDRESS = ${TokenContractAddress}\n`
  );
}

deployTokenContract();
