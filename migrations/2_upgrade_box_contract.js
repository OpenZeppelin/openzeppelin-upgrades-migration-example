const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const BoxV2 = artifacts.require('BoxV2');

module.exports = async function (deployer) {
  const [ Box ] = OZ_SDK_EXPORT.networks.rinkeby.proxies["openzeppelin-upgrades-migration-example/Box"];
  const instance = await upgradeProxy(Box.address, BoxV2, { deployer });
  console.log("Upgraded", instance.address);
};
