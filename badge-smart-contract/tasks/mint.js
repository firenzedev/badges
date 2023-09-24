const { task } = require('hardhat/config');
const fs = require('fs');

task('mint', 'Mint a token and assign it to the given list of addresses')
  .addParam('contractAddress', 'Address of the deployed contract')
  .addParam('tokenId', 'Token ID')
  .addParam('addressFile', 'File containing a list of addresses to assign the token to')
  .setAction(async (taskArgs, hre) => {
    var addressList = fs
      .readFileSync(taskArgs.addressFile)
      .toString()
      .split('\n')
      .map((address) => address.trim())
      .filter((line) => line !== '');

    console.log(`Minting ${addressList.length} token #${taskArgs.tokenId}...`);

    const contract = await hre.ethers.getContractAt('FirenzeDevBadge', taskArgs.contractAddress);
    const txn = await contract.mint(taskArgs.tokenId, addressList);

    console.log(`Transaction ${txn.hash} in progress, please wait...`);

    const txnReceipt = await txn.wait();
    console.log(`Transaction ${txnReceipt.status ? 'confirmed' : 'reverted'}`);
  });
