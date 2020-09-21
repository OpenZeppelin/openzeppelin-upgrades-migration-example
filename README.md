# openzeppelin-upgrades-migration-example

This repo is a sample [OpenZeppelin CLI](https://github.com/OpenZeppelin/openzeppelin-sdk/blob/master/packages/cli) project intended to be migrated using the [Buidler or Truffle upgrade plugins](https://github.com/OpenZeppelin/openzeppelin-upgrades).

Use this repo to test the migration script as explained in the [CLI → Plugins migration guide]().

## But first, reproduce required the environment
Make sure you checkout to the `truffle` or `buidler` branch of this repo depending on which tool you intend to use.

```bash
$ git checkout truffle
# or
$ git checkout buidler
```

**Only then** install the dependencies (each branch have their own)

```bash
$ yarn
```

Make sure you run a local chain

```bash
$ npx buidler node   # it will be easier to use this one for buidler
$ npx ganache-cli    # we will need extra steps for truffle (see below)
```

Then deploy the `Box` contract using the OpenZeppelin CLI

```bash
$ npx oz deploy
```

## Before migrating the project (Truffle only)

Since the CLI migration script not only ignores but it deletes development network manifest files, we can't test our migration with them. This repo was set up to circumvent this issue by faking a local `rinkeby` network configuring Buidler's local chain to have `chainId == 4`, but since `ganache-cli` doesn't support this yet we'll have to manually change our manifest file name to trick the migration script.

The `oz deploy` command we run before created a `dev-xxxxxxxxxxxxx.json` file under the `.openzeppelin` directory. Take that file and change its name to `rinkeby.json`:

```bash
$ mv .openzeppelin/dev-1600712876728.json .openzeppelin/rinkeby.json
```

Then, run the migration script as indicated in the migration guide:

```bash
$ npx migrate-oz-cli-project
```

And before doing anything else, rename this `rinkeby.json` file to `unknown-1337.json`.

```bash
$ mv .openzeppelin/rinkeby.json .openzeppelin/unknown-1337.json
```

> Notice that the previous name had a variable name (the `x`'s indicating the timestamp at which `ganache-cli` was run) while the new one has a fixed `1337`, corresponding to ganache's `chainId` value.