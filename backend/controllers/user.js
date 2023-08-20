const User = require("../models/user");
const Event = require("../models/event");

const { redeemReward } = require("../web3/rewards");
const { completeTask } = require("../web3/tasks");
const {
  createUser,
  removeUser,
  fundUser,
  stakeTokens,
  unstakeTokens,
} = require("../web3/user");

async function create(name) {
  const { address } = await createUser();
  const user = new User({
    name,
    address,
  });
  await user.save();
  return user;
}

async function fund(uId, amount) {
  const user = await User.findById(uId);
  await fundUser(user.address, amount);
  user.balance += amount;
  await user.save();
}

async function get(id) {
  return User.findById(id);
}

async function getUserEvents(id) {
  return User.findById(id).populate("events");
}

async function remove(id) {
  await User.findByIdAndDelete(id);
  await removeUser(id);
}

async function getAll() {
  return User.find();
}

async function addEvent(uId, eId) {
  const user = await User.findById(uId);
  console.log(user);
  user.events.push(eId);
  const event = await Event.findById(eId);
  event.count += 1;
  if (event.type === "task") {
    await completeTask(user.address, eId);
    user.totalRewards += event.amount;
  } else {
    await redeemReward(user.address, eId);
    const rewardLength = user.events.filter(
      (item) => item.type === "reward"
    ).length;
    if (rewardLength == 1) {
      await addEvent(user._id, "64e24575b59aa9f0ef147da5");
    }
    if (rewardLength == 10) {
      await addEvent(user._id, "64e2457eb59aa9f0ef147da7");
    }
  }
  await user.save();
  await event.save();
}

async function getAvailableUserEvents(uId, type) {
  const user = await User.findById(uId);
  const events = await Event.find({ type: type });
  const availableEvents = [];
  for (const event of events) {
    if (!user.events.includes(event._id)) {
      availableEvents.push(event);
    }
  }
  return availableEvents;
}

async function stakeUserTokens(uId, amount) {
  const user = await User.findById(uId);
  user.stake += amount;
  await stakeTokens(user.address, amount);
  await user.save();
}

async function unstakeUserTokens(uId, amount) {
  const user = await User.findById(uId);
  user.stake -= amount;
  await unstakeTokens(user.address);
  await user.save();
}

module.exports = {
  create,
  remove,
  get,
  getUserEvents,
  getAll,
  addEvent,
  getAvailableUserEvents,
  fund,
  stakeUserTokens,
  unstakeUserTokens,
};
