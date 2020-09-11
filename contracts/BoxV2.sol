// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;


contract BoxV2 {
    uint256 private value;
    bool private readonly;

    // Emitted when the stored value changes
    event ValueChanged(uint256 newValue);

    // Stores a new value in the contract
    function store(uint256 newValue) public {
        require(! readonly);
        value = newValue;
        emit ValueChanged(newValue);
    }

    // Reads the last stored value
    function retrieve() public view returns (uint256) {
        return value;
    }

    // Sets readability
    function setReadonly(bool _readonly) public returns (bool) {
        readonly = _readonly;
        return readonly;
    }
}
