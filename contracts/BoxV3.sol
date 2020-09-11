// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;


contract BoxV3 {
    uint256 private value;
    bool private readOnly;

    // Emitted when the stored value changes
    event ValueChanged(uint256 newValue);
    event ReadOnlyChanged(bool readOnly);

    // Stores a new value in the contract
    function store(uint256 newValue) public {
        require(! readOnly);
        value = newValue;
        emit ValueChanged(newValue);
    }

    // Reads the last stored value
    function retrieve() public view returns (uint256) {
        return value;
    }

    // Sets readability
    function setReadOnly(bool _readOnly) public returns (bool) {
        readOnly = _readOnly;
        emit ReadOnlyChanged(readOnly);
        return readOnly;
    }
}
