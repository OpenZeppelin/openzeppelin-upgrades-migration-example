const { ethers, upgrades } = require("@nomiclabs/buidler");
const OZ_SDK_EXPORT = require("../openzeppelin-cli-export.json");

async function main() {
  const [ Box ] = OZ_SDK_EXPORT.networkFiles.rinkeby.proxies["openzeppelin-upgrades-migration-example/Box"];
  const BoxV2 = await ethers.getContractFactory("BoxV2");
  await upgrades.upgradeProxy(Box.address, BoxV2);
}

main();
