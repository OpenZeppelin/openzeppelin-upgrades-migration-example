# Buidler
0. run ganache-cli
// ganache doesn't work with buidler yet
// see https://github.com/nomiclabs/buidler/blob/development/packages/buidler-core/src/internal/core/providers/provider-utils.ts#L38
// npx buidler node

1. Write and deploy Box
```
npx oz init
npx oz deploy
```

2. BoxV2: add functionality to Box and upgrade it
- had a few issues here getting it to recognize the new version (what if it has another name?)
```
npx oz upgrade
```

3. Install buidler-upgrades
3.a
```
npm install --save-dev @openzeppelin/buidler-upgrades
```

3.b Add usePlugin to buidler config
```
usePlugin('@openzeppelin/buidler-upgrades')
```
4. Write BoxV3 and deploy script
// how do I get my proxy addresses? `oz list`?
// faked it with `oz call` and copy address

deployBox3.js:
```
const { ethers, upgrades } = require("@nomiclabs/buidler");

async function main() {
  const proxyAddress = '0x4281E751bD22fa819eB7ECF222031c3596bb652e';

  const BoxV3 = await ethers.getContractFactory("BoxV3");
  const upgraded = await upgrades.upgradeProxy(proxyAddress, BoxV3);
  await upgraded.deployed();
}

main();
```

5. run!
```
npx buidler compile
node scripts/deployBox3.js

(node:41083) UnhandledPromiseRejectionWarning: Error: Proxy admin is not the one registered in the network manifest
```
(migration required)

6. adapt manifest
// adapt name
cp .openzeppelin/dev-31337.json .openzeppelin/unknown-31337.json

// adapt version
"manifestVersion": -> "3.0"

// adapt admin structure
from:
```
"proxyAdmin": {
  "address": "0x8858eeB3DfffA017D4BCE9801D340D36Cf895CCf"
}
```

to:
```
"admin": {
  "address": "0x8858eeB3DfffA017D4BCE9801D340D36Cf895CCf"
}
```