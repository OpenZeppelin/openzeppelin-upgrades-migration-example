usePlugin('@nomiclabs/buidler-ethers');
usePlugin('@openzeppelin/buidler-upgrades');

module.exports = {
  defaultNetwork: 'buidlerevm',
  networks: {
    buidlerevm: {
      chainId: 4,
    },
  },
  solc: {
    version: "0.6.12",
    optimizer: {
      enabled: false,
      runs: 200,
    }
  }
};
