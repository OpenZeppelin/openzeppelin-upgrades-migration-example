// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;


contract BoxV3 {
    uint256 private value;
    bool private flag;
    mapping (uint => bool) par;

    struct Foo {
        bool x;
    }

    enum Direction { UP, DOWN }

    Foo private foo;
    Direction private dir;
    uint[] private intArray;
    Direction[] private dirArray;
    bytes8 ocho;
    uint[10] enteritos;


    // Emitted when the stored value changes
    event ValueChanged(uint256 newValue);

    // Stores a new value in the contract
    function store(uint256 newValue) public {
        par[newValue] = true;
    }

    // Reads the last stored value
    function retrieve() public view returns (uint256) {
        return value;
    }

    function set() public returns (bool) {
        flag = !flag;
        return flag;
    }

    function get() public view returns (bool) {
        return flag;
    }
}
