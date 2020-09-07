const fs = require('fs');

const LOCATION = '.openzeppelin/';
const OLD_MANIFEST_LOCATION = LOCATION + 'dev-31337.json';
const NEW_MANIFEST_LOCATION = LOCATION + 'unknown-31337.json';
const PROXY_LIST_LOCATION = LOCATION + 'proxies.json';

async function main() {
  const oldManifest = JSON.parse(fs.readFileSync(OLD_MANIFEST_LOCATION));
  const newManifest = updateManifest(oldManifest);
  const proxies = transformProxies(oldManifest.proxies);

  writeFile(NEW_MANIFEST_LOCATION, newManifest);
  writeFile(PROXY_LIST_LOCATION, proxies);
}

function writeFile(location, data) {
  fs.writeFileSync(location, JSON.stringify(data, null, 2));
}

function transformProxies(proxies) {
  return Object.keys(proxies).map(proxyName => ({
    name: proxyName.split('/').pop(),
    proxies: proxies[proxyName].map(proxy => ({
      address: proxy.address,
      implementation: proxy.implementation,
      admin: proxy.admin
    }))
  }));
}

function updateManifest(oldManifest) {
  return {
    manifestVersion: "3.0",
    impls: transformImplementations(oldManifest.contracts),
    admin: {
      address: oldManifest.proxyAdmin.address,
      txHash: "no_hash"
    }
  }
}

function transformImplementations(contracts) {
  const impls = {};
  for (const contractName in contracts) {
    const contract = contracts[contractName];
    impls[contract.deployedBytecodeHash] = transformImplementationItem(contract);
  }
  return impls;
}

function transformImplementationItem(contract) {
  return {
    address: contract.address,
    txHash: "no_hash",
    layout: transformLayout(contract)
  }
}

function transformLayout(contract) {
  return {
    storage: contract.storage.map(transformStorageItem),
    types: transformTypes(contract.types)
  }
}

function transformStorageItem(storageItem) {
  return {
    contract: storageItem.contract,
    label: storageItem.label,
    type: storageItem.type,
    // TODO reconstruct path and line if sourcecode is available
    src: storageItem.path,
  }
}

function transformTypes(oldTypes) {
  const newTypes = {};
  for (const _type in oldTypes) {
    newTypes[_type] = {
      label: oldTypes[_type].label
    }
  }
  return newTypes;
}

main();