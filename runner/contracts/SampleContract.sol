// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SampleContract is ERC20 {
    constructor(
        string memory name,
        string memory ticker,
        uint256 totalSupply
    ) ERC20(name, ticker) {
        _mint(msg.sender, totalSupply);
    }
}
