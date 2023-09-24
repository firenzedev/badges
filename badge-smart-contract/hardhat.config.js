require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();
require('./tasks/mint');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.19',
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_API,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    },
  },
};
