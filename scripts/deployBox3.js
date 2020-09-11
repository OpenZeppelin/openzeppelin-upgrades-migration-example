const { ethers, upgrades } = require("@nomiclabs/buidler");
const OZ_SDK_EXPORT = require("../openzeppelin-cli-export.json");

async function main() {
  const [ BoxV2 ] = OZ_SDK_EXPORT.rinkeby.Box;
  const BoxV3 = await ethers.getContractFactory("BoxV3");
  await upgrades.upgradeProxy(BoxV2, BoxV3);
}

main();
