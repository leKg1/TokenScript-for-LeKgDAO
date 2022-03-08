const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BotlDao", function () {
  it("Should mint, deposit, and create a proposal token", async function () {
    const accounts = await ethers.getSigners();
    console.log("accounts", accounts)
    const firstAccount = accounts[0].address
    console.log("firstAccount", accounts[0].address)
    const amount = ethers.utils.parseUnits('80')
    const amountToDeposit = ethers.utils.parseEther("45")
    // console.log("amount",amount)
    // ethers.utils.formatEther(); - converts in wei to ether, effectively dropping 18 0's

    const BotlDao = await ethers.getContractFactory("BotlDao");
    const boltDao = await BotlDao.deploy();
    await boltDao.deployed();
    console.log("BotlDao deployed to:", boltDao.address);

    const firstAccountBalance1 = (await boltDao.balanceOf(firstAccount)).toString()
    console.log("firstAccountBalance1",firstAccountBalance1)

    // Mint test
    const mint = await boltDao.mint(accounts[0].address,amount);
    await mint.wait();
    const firstAccountBalance2 = (await boltDao.balanceOf(firstAccount)).toString()
    console.log("firstAccountBalance2",firstAccountBalance2)
    expect(firstAccountBalance2).to.equal(amount);

    // Deposit test
    const deposit = await boltDao.deposit(amountToDeposit);
    await deposit.wait();
    const shares = await boltDao.shares(firstAccount);
    console.log("shares",shares);
    expect(shares).to.equal(amountToDeposit);

    // Create project proposal
    const createProjectProposal = await boltDao.createProjectProposal("BotlDao",1446,780923,648737);
    await createProjectProposal.wait();
    const firstProposal = await boltDao.proposals(0);
    console.log("firstProposal",firstProposal);
    expect(firstProposal).to.be.an('array').that.includes("BotlDao");

    // Vote on proposal
    const vote = await boltDao.vote(0,1);
    await vote.wait();
    const ourVote = await boltDao.votes(firstAccount,0);
    expect(ourVote).to.equal(true);

  });
});
