const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('FirenzeDevBadge contract', () => {
  const METADATA_URI = 'https://this.is/a/fake/uri/{id}.json';
  let owner, user1, user2, contract;

  beforeEach(async () => {
    [owner, user1, user2] = await ethers.getSigners();
    contract = await ethers.deployContract('FirenzeDevBadge', [METADATA_URI]);
  });

  it('should return the metadata uri even if a token is not yet minted', async () => {
    expect(await contract.uri(1)).to.equal(METADATA_URI);
    expect(await contract.uri(2)).to.equal(METADATA_URI);
    expect(await contract.uri(2001)).to.equal(METADATA_URI);
  });

  it('should return the name of the collection', async () => {
    expect(await contract.name()).to.equal('firenze.dev badges');
  });

  it('should prevent any user but the owner from minting', async () => {
    await expect(contract.connect(user1).mint(1, [user1.address])).to.be.revertedWith(
      'Ownable: caller is not the owner'
    );
  });

  it('should let the owner mint and transfer the token to the given addresses', async () => {
    expect(await contract.balanceOf(owner.address, 1)).to.equal(0);
    expect(await contract.balanceOf(user1.address, 1)).to.equal(0);
    expect(await contract.balanceOf(user2.address, 1)).to.equal(0);

    await contract.mint(1, [user1.address, user2.address]);

    expect(await contract.balanceOf(owner.address, 1)).to.equal(0);
    expect(await contract.balanceOf(user1.address, 1)).to.equal(1);
    expect(await contract.balanceOf(user2.address, 1)).to.equal(1);
  });

  it('should prevent a user from transferring an owned token', async () => {
    await contract.mint(1, [user1.address]);

    expect(await contract.balanceOf(user1.address, 1)).to.equal(1);

    await expect(contract.connect(user1).safeTransferFrom(user1.address, user2.address, 1, 1, '0x')).to.be.revertedWith(
      'FirenzeDevBadge: cannot be transferred'
    );
  });

  it('should let the owner transfer a token on behalf of a user', async () => {
    await contract.mint(1, [user1.address]);

    expect(await contract.balanceOf(user1.address, 1)).to.equal(1);
    expect(await contract.balanceOf(user2.address, 1)).to.equal(0);

    await contract.connect(user1).setApprovalForAll(owner.address, true);
    await contract.safeTransferFrom(user1.address, user2.address, 1, 1, '0x');

    expect(await contract.balanceOf(user1.address, 1)).to.equal(0);
    expect(await contract.balanceOf(user2.address, 1)).to.equal(1);
  });
});
