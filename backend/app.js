const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const userController = require("./controllers/user");
const eventController = require("./controllers/event");

const {
  getUserBalance,
  fundUser,
  stakeTokens,
  unstakeTokens,
  getUserTransactions,
} = require("./web3/user");

const app = express();

var cors = require("cors");
const { getAllTransactions, getContractBalance } = require("./web3/contract");
app.use(cors());

mongoose.connect(process.env.MONGODB_URL);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const uId = req.query.id;
  const user = await userController.get(uId);
  console.log(user);
  res.send(user);
});

app.get("/users/balance", async (req, res) => {
  const user = await userController.get(req.query.id);
  console.log(user);
  const balance = await getUserBalance(user.address);
  console.log(Number(balance));
  res.send(String(balance));
});

app.post("/users/fund", async (req, res) => {
  const uId = req.query.id;
  const amount = req.query.amount;
  console.log(uId, amount);
  const user = await userController.get(uId);
  await fundUser(user.address, amount);
  res.send(true);
});

app.post("/users/events/add", async (req, res) => {
  const eId = req.query.eId;
  const uId = req.query.uId;
  console.log(eId, uId);
  await userController.addEvent(uId, eId);
});

app.get("/users/rewards", async (req, res) => {
  const uId = req.query.id;
  const user = await userController.get(uId);
  const rewards = await userController.getUserEvents(user, "reward");
  res.send(rewards);
});

app.get("/users/tasks", async (req, res) => {
  const uId = req.query.id;
  const user = await userController.get(uId);
  const tasks = await userController.getUserEvents(user, "task");
  res.send(tasks);
});

app.get("/tasks", async (req, res) => {
  const uId = req.query.id;
  console.log(uId);
  if (uId === undefined) {
    const tasks = await eventController.getAll("task");
    res.send(tasks);
  } else {
    const tasks = await userController.getAvailableUserEvents(uId, "task");
    res.send(tasks);
  }
});

app.get("/rewards", async (req, res) => {
  const uId = req.query.id;
  console.log(uId);
  if (uId === undefined) {
    const rewards = await eventController.getAll("reward");
    console.log(rewards);
    res.send(rewards);
  } else {
    const rewards = await userController.getAvailableUserEvents(uId, "reward");
    console.log(rewards);
    res.send(rewards);
  }
});

app.post("/tasks", async (req, res) => {
  const task = req.body;
  await eventController.create("task", task);
});

app.post("/rewards", async (req, res) => {
  const reward = req.body;
  await eventController.create("reward", reward);
});

app.post("/users/stake", async (req, res) => {
  const uId = req.query.id;
  const amount = req.query.amount;
  console.log(uId, amount);
  await userController.stakeUserTokens(uId, amount);
});

app.post("/users/unstake", async (req, res) => {
  const uId = req.query.id;
  await userController.unstakeUserTokens(uId);
});

app.get("/transactions", async (req, res) => {
  const transactions = await getAllTransactions();
  console.log(transactions);
  res.send(transactions);
});

app.get("/users/transactions", async (req, res) => {
  const uId = req.query.id;
  const user = await userController.get(uId);
  const transactions = await getUserTransactions(user.address, 10);
  console.log(transactions);
  res.send(transactions);
});

app.get("/balance", async (req, res) => {
  const balance = await getContractBalance();
  console.log(balance);
  res.send(String(balance));
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Something went wrong!");
});

app.listen(5001, () => {
  console.log("Server has started!");
});
