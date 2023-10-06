require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();
require('./tasks/mint');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.19',
  networks: {
    polygon: {
      url: process.env.POLYGON_API,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    },
    mumbai: {
      url: process.env.MUMBAI_API,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    },
    sepolia: {
      url: process.env.SEPOLIA_API,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    },
  },
};
