# OpenZeppelin CLI to Upgrades Plugins migration

This repo is a sample [OpenZeppelin CLI](https://github.com/OpenZeppelin/openzeppelin-sdk/blob/master/packages/cli) project intended to be migrated using the [Hardhat or Truffle upgrade plugins](https://github.com/OpenZeppelin/openzeppelin-upgrades).

Use this repo to test the migration script as explained in [Migrate from OpenZeppelin CLI](https://docs.openzeppelin.com/upgrades-plugins/migrate-from-cli).

## But first, reproduce the required environment
Make sure you checkout to the `truffle` or `hardhat` branch of this repo depending on which tool you intend to use.

```bash
$ git checkout truffle
# or
$ git checkout hardhat
```

**Only then** install the dependencies (each branch have their own).

```bash
$ npm install
```

Run a local chain and don't forget to use it! (see final step).

> Since the migration script is for public and not for development chains, we will need to cheat a bit. More on this below.

```bash
$ npx hardhat node   # easier for hardhat
# or
$ npx ganache-cli    # we will need extra steps for truffle (see below)
```

Then deploy the `Box` contract to the `rinkeby` network using the OpenZeppelin CLI.

```bash
$ npx oz deploy Box -n rinkeby -k upgradeable
✓ Compiled contracts with solc 0.6.12 (commit.27d51765)
✓ Contract Box deployed
All implementations have been deployed
? Call a function to initialize the instance after creating it? No
✓ Setting everything up to create contract instances
✓ Instance created at 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
To upgrade this instance run 'oz upgrade'
0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
```

Finally, from this step on remember to send all calls and transactions to the `localhost` network.

```bash
$ npx hardhat run scripts/upgradeToV2.js --network localhost
# or
$ npx truffle migrate --network localhost
```

## A little bit of cheating

Since the CLI migration script not only ignores but it deletes development network files, we can't test our migration with them. This is why this repo has preconfigured OpenZeppelin CLI, Truffle and Hardhat settings to fake a local `rinkeby` network (`chainId == 4`) to circumvent this issue.

Additionally if you're using Truffle, we'll have to trick the migration script by manually changing the network file name before and after running it since `ganache-cli` doesn't support custom `chainId` yet.

So, the `oz deploy` command we run before created a `dev-xxxxxxxxxxxxx.json` file under the `.openzeppelin` directory. Take that file and name it `rinkeby.json`:

```bash
$ mv .openzeppelin/dev-1600712876728.json .openzeppelin/rinkeby.json
```

Then, run the migration script as indicated in the [migration guide](https://www.notion.so/write-migration-guide-16a0237047f64cb8b236e8d18e64e5d4):

```bash
$ npx migrate-oz-cli-project
```

And before doing anything else, rename this `rinkeby.json` file to `unknown-1337.json`.

```bash
$ mv .openzeppelin/rinkeby.json .openzeppelin/unknown-1337.json
```

> Notice that the previous name had a variable name (the `x`'s indicating the timestamp at which `ganache-cli` was run) while the new one has a fixed `1337`, corresponding to ganache's `chainId` value.
