import { fs } from "fs";

const TokenContract = JSON.parse(
  fs.readFileSync(__dirname + "/bin/TokenContract.json", "utf8")
);
const CompanyContract = JSON.parse(
  fs.readFileSync(__dirname + "/bin/CompanyContract.json", "utf8")
);

module.exports = {
  TokenContract,
  CompanyContract,
};
