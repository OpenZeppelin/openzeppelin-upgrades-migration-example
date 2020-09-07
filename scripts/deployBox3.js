const { ethers, upgrades } = require("@nomiclabs/buidler");

async function main() {
  const BoxV3 = await ethers.getContractFactory("BoxV3");
  const upgraded = await upgrades.deployProxy(BoxV3, [], { 'unsafeAllowCustomTypes': true });
  await upgraded.deployed();
}

main();
