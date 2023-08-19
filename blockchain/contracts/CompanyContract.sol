// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./TokenContract.sol";

contract CompanyContract {
    // address used to deploy the contract
    address private owner;

    // address of TokenContract contract
    TokenContract private token;

    // count number of transactions, also used as transaction ID
    uint transactionNonce = 0;

    // event to store token transactions amoung users
    event Transaction(
        uint indexed transactId,
        address sender,
        address receiver,
        uint amount
    );

    // event which checks when a reward is redeemed
    event RewardTransaction(
        uint indexed transactId,
        uint indexed rId,
        address indexed userAddress,
        uint amount
    );

    // event which checks when a task is completed
    event TaskTransaction(
        uint indexed transactId,
        uint indexed tId,
        address indexed userAddress,
        uint amount
    );

    // Structure to store offers and rewards
    struct Event {
        // stores the amount of event
        uint amount;
    }

    // Strucuture to store stake token data
    struct Stake {
        // store amount of staked tokens
        uint amount;
        // stores timestamp of stake
        uint timestamp;
    }

    // mapping which stores user data mapped to an account address
    mapping(address => bool) private users;

    // mapping which stores tasks mapped to a task id
    mapping(uint => Event) public tasks;

    // mapping which stores rewards mapped to a reward id
    mapping(uint => Event) public rewards;

    // mapping which stores staked token data mapped to an account address
    mapping(address => Stake) private stakes;

    // mapping used to store completed tasks for each user
    // user address is mapped to another mapping which maps a boolean value to a task id
    mapping(address => mapping(uint => bool)) private taskTransactions;

    // mapping used to store redeemed rewards for each user
    mapping(address => mapping(uint => bool)) private rewardTransactions;

    // modifier which only allows contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    // modifier which checks that user exists
    modifier isUser(address userAddress) {
        require(users[userAddress], "User does not exist");
        _;
    }

    // modifier which only allows a single event type
    modifier onlyReward(uint rId) {
        require(rewards[rId].amount != 0, "Reward does not exist");
        _;
    }

    // modifier which only allows a single event type
    modifier onlyTask(uint tId) {
        require(tasks[tId].amount != 0, "Task does not exist");
        _;
    }

    modifier checkZero(uint value) {
        require(value != 0, "Value cannot be 0");
        _;
    }

    // constructor for the contract
    // requires an initial amount of fungible tokens
    constructor(address tokenContract, uint initialAmount) {
        // set owner as the user address which deployed this contract
        owner = msg.sender;
        // set TokenContract address
        token = TokenContract(tokenContract);
        // mint an inital amount of tokens
        token.mint(address(this), initialAmount);
    }

    // contract to emit Transaction events
    function emitTransaction(
        address sender,
        address receiver,
        uint amount
    ) private {
        emit Transaction(transactionNonce, sender, receiver, amount);
        transactionNonce += 1;
    }

    // function to create a new user
    function createUser(address userAddress) external onlyOwner {
        // maps the user address to users mapping and sets the user type
        users[userAddress] = true;
        // give welcome bonus to user
        token.transfer(userAddress, 10);
        // emit a transaction event
        emitTransaction(address(this), userAddress, 10);
    }

    // function to remove a user
    function removeUser(
        address userAddress
    ) external onlyOwner isUser(userAddress) {
        // remove user address from users mapping by setting all values to default
        users[userAddress] = false;
        // get user balance
        uint balance = token.balanceOf(userAddress);
        // transfer tokens in user address to contract address
        token.transferFrom(userAddress, address(this), balance);
        // emit a token transaction event
        emitTransaction(userAddress, address(this), balance);
    }

    // function to transfer tokens to a user account
    function fundUser(
        address userAddress,
        uint amount
    ) external onlyOwner isUser(userAddress) {
        // transfer tokens from contract address to user address
        token.transfer(userAddress, amount);
        // emit a token transaction event
        emitTransaction(address(this), userAddress, amount);
    }

    // function to create an event
    function createTask(
        uint tId,
        uint amount
    ) external onlyOwner checkZero(amount) {
        // check that task does not exist
        require(tasks[tId].amount == 0, "Task already exists");
        // maps the event id to an event object
        tasks[tId] = Event(amount);
    }

    // function to remove an event
    function removeTask(uint tId) external onlyOwner onlyTask(tId) {
        // remove the event from events mapping by setting all values to default
        tasks[tId] = Event(0);
    }

    // function to mark a task as completed
    function completeTask(uint tId) external onlyTask(tId) isUser(msg.sender) {
        // check that user has not already completed the task
        require(
            taskTransactions[msg.sender][tId] == false,
            "Already completed event"
        );
        // transfer the task amount tokens to user address
        token.transfer(msg.sender, tasks[tId].amount);
        // mark the task as completed
        taskTransactions[msg.sender][tId] = true;
        // emit a transaction event
        emitTransaction(address(this), msg.sender, tasks[tId].amount);
        // emit a task event
        emit TaskTransaction(
            transactionNonce,
            tId,
            msg.sender,
            tasks[tId].amount
        );
        transactionNonce += 1;
    }

    // function to create a reward
    function createReward(
        uint rId,
        uint amount
    ) external onlyOwner checkZero(amount) {
        // check that reward does not exist
        require(rewards[rId].amount == 0, "Reward already exists");
        // maps the reward id to an event object
        rewards[rId] = Event(amount);
    }

    // function to remove a reward
    function removeReward(uint rId) external onlyOwner onlyReward(rId) {
        // remove the reward from rewards mapping by setting all values to default
        rewards[rId] = Event(0);
    }

    // function to redeem a reward
    function redeemReward(
        uint rId
    ) external isUser(msg.sender) onlyReward(rId) {
        // check that the user has not already redeemed the reward
        require(
            rewardTransactions[msg.sender][rId] == false,
            "Already redeemed reward"
        );
        // get the reward from events mappping
        Event memory reward = rewards[rId];
        // transfers tokens from customer address to contract address
        token.transferFrom(msg.sender, address(this), reward.amount);
        // marks the reward as redeemed by the customer
        rewardTransactions[msg.sender][rId] = true;
        // emit a transaction event
        emitTransaction(msg.sender, address(this), reward.amount);
        // emit a reward event
        emit RewardTransaction(
            transactionNonce,
            rId,
            msg.sender,
            reward.amount
        );
        // increase transaction count
        transactionNonce += 1;
    }

    // function to stake tokens
    function stakeTokens(
        uint amount
    ) external isUser(msg.sender) checkZero(amount) {
        // check that user has not already staked tokens
        require(
            stakes[msg.sender].amount == 0,
            "User has already staked tokens"
        );
        // add stake token data mapping in stakes mapping
        stakes[msg.sender] = Stake(amount, block.timestamp);
        // transfer tokens from user address to contract address
        token.transferFrom(msg.sender, address(this), amount);
        // emit a transcation event
        emitTransaction(msg.sender, address(this), amount);
    }

    // function to calculate tokens earned relative to amount of staked tokens
    function calculateStake() public view isUser(msg.sender) returns (uint) {
        // check that user has staked tokens
        require(stakes[msg.sender].amount != 0, "User has no staked tokens");
        // get stake token data of user address from stakes mapping
        Stake memory stake = stakes[msg.sender];
        // calculate profit
        // for every 100 tokens user gets one token every day
        uint profit = stake.amount +
            (stake.amount / 100) *
            ((block.timestamp - stake.timestamp) / 1 days);
        // return the calculated profit
        return profit;
    }

    // function to unstake tokens
    function unstakeTokens() external isUser(msg.sender) {
        // check that user has staked tokens
        require(stakes[msg.sender].amount != 0, "User has no staked tokens");
        // get the profit
        uint amount = calculateStake();
        // transfer tokens to user account
        token.transfer(msg.sender, amount);
        // emit a transaction event
        emitTransaction(address(this), msg.sender, amount);
        // remove user stake token data from stakes mapping by setting all values to default
        stakes[msg.sender] = Stake(0, 0);
    }
}
