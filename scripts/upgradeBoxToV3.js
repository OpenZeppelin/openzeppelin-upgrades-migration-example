const { ethers, upgrades } = require("@nomiclabs/buidler");
const OZ_SDK_EXPORT = require("../openzeppelin-cli-export.json");

async function main() {
  const [ BoxV2 ] = OZ_SDK_EXPORT.networkFiles.rinkeby.proxies["openzeppelin-upgrades-migration-example/Box"];
  const BoxV3 = await ethers.getContractFactory("BoxV3");
  const foo = await upgrades.upgradeProxy(BoxV2.address, BoxV3);
  console.log(foo);
}

main();
