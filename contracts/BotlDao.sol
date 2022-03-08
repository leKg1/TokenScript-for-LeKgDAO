// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";

contract BotlDao {

    string public name = "BotlDao";       
    uint256 public decimals = 18; 
    string public symbol = "BOTL";  
    
    enum VotingOptions { No,Yes }
    enum Status { Rejected, Accepted, Pending }
    struct Proposal {
        uint256 id;
        address author;
        string name;
        uint256 createdAt;
        uint256 votesForYes;
        uint256 votesForNo;
        Status status;
        uint256 amountBotls;
        uint256 geoPosLat;
        uint256 geoPosLong;
    }
    
    // store all proposals
    mapping(uint => Proposal) public proposals;
    // who already votes for who and to avoid vote twice
    mapping(address => mapping(uint => bool)) public votes;
    // one share for governance tokens
    mapping(address => uint256) public shares;
    uint public totalShares;
    // the IERC20 allow us to use avax like our governance token.
    IERC20 public token;
    // the user need minimum 25 AVAX to create a proposal.
    uint constant CREATE_PROPOSAL_MIN_SHARE = 25 * 10 ** 18;
    uint constant VOTING_PERIOD = 7 days;
    uint public nextProposalId;
    uint public proposalId;

        // Returns balance of an address
    function balanceOf(address addr) public view returns (uint) {
        return balances[addr];
    }

    // An address stores addresses of contracts or external (user) accounts
    address public minter;

    // A mapping lets you create complex custom data types.
    // This mapping assigns an unsigned integer to an address
    // and is also a public variable.
    mapping (address => uint) public balances;

    // Events allow Ethereum clients to react to specific
    // contract changes you declare.
    // This defines the event and it is sent later
    event Sent(address from, address to, uint amount);
    
    constructor() {
        token = IERC20(0xA048B6a5c1be4b81d99C3Fd993c98783adC2eF70); // AVAX address
        // Uses the special msg global variable to store the
        // address of the contract creator
        minter = msg.sender;
    }

     // Sends an amount of newly created coins to an address
    function mint(address receiver, uint amount) public {
        // require statements define conditions that must pass
        // before state is changed.
        // If it fails (equals false), an exception is triggered
        // and reverts all modifications to state from the current call

        // Can only be called by the contract creator
        require(msg.sender == minter);

        // Ensures a maximum amount of tokens
        require(amount < 1e60);
        balances[receiver] += amount;
    }

     // Sends an amount of existing coins
    // from any caller to an address
    function transfer(address receiver, uint amount) public {
        // The sender must have enough coins to send
        require(amount <= balances[msg.sender], "Insufficient balance.");
        // Adjust balances
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        // Emit event defined earlier
        emit Sent(msg.sender, receiver, amount);
    }
    
    function deposit(uint _amount) external {
        shares[msg.sender] += _amount;
        totalShares += _amount;
        token.transferFrom(msg.sender, address(this), _amount);
    }
    
    function withdraw(uint _amount) external {
        require(shares[msg.sender] >= _amount, 'Not enough shares');
        shares[msg.sender] -= _amount;
        totalShares -= _amount;
        token.transfer(msg.sender, _amount);
    }

    // function createProjectProposal(string memory name, uint256 amountBotls, uint256 geoPosLat, uint256 geoPosLong) external {
    // // validate the user has enough shares to create a proposal
    // require(shares[msg.sender] >= CREATE_PROPOSAL_MIN_SHARE, 'Not enough shares to create a proposal');
    
    // proposals[nextProposalId] = Proposal(
    //     nextProposalId,
    //     msg.sender,
    //     name,
    //     block.timestamp,
    //     0,
    //     0,
    //     Status.Pending,
    //     amountBotls,
    //     geoPosLat,
    //     geoPosLong
    // );
    // nextProposalId++;
    // }

    function getProposals() external {
        proposals;
    }

    function createProjectProposal(string memory name, uint256 amountBotls, uint256 geoPosLat, uint256 geoPosLong) external {
    // validate the user has enough shares to create a proposal
    require(shares[msg.sender] >= CREATE_PROPOSAL_MIN_SHARE, 'Not enough shares to create a proposal');
    
    proposals[nextProposalId] = Proposal(
        nextProposalId,
        msg.sender,
        name,
        block.timestamp,
        0,
        0,
        Status.Pending,
        amountBotls,
        geoPosLat, // 7 Decimals for latitude
        geoPosLong // 7 Decimals for longitude
    );
    nextProposalId++;
    }

    function vote(uint _proposalId, VotingOptions _vote) external {
    Proposal storage proposal = proposals[_proposalId];
    require(votes[msg.sender][_proposalId] == false, 'already voted');
    require(block.timestamp <= proposal.createdAt + VOTING_PERIOD, 'Voting period is over');
    votes[msg.sender][_proposalId] = true;
    if(_vote == VotingOptions.Yes) {
        proposal.votesForYes += shares[msg.sender];
        if(proposal.votesForYes * 100 / totalShares > 50) {
            proposal.status = Status.Accepted;
        }
    } else {
        proposal.votesForNo += shares[msg.sender];
        if(proposal.votesForNo * 100 / totalShares > 50) {
            proposal.status = Status.Rejected;
        }
    }
    }
}