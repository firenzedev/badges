// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FirenzeDevBadge is ERC1155, Ownable {
    string public name = "firenze.dev badges";

    constructor(string memory uri) ERC1155(uri) {}

    function mint(uint256 id, address[] calldata to) external onlyOwner {
        for (uint256 i = 0; i < to.length; i++) {
            _mint(to[i], id, 1, "");
        }
    }

    function _beforeTokenTransfer(
        address operator,
        address,
        address,
        uint256[] memory,
        uint256[] memory,
        bytes memory
    ) internal view override {
        require(operator == owner(), "FirenzeDevBadge: cannot be transferred");
    }
}
