const User = require("../models/user");
const Event = require("../models/events");

const { redeemReward } = require("../web3/rewards");
const { completeTask } = require("../web3/tasks");
const { createUser, removeUser } = require("../web3/user");

async function create(name, email, password) {
  const { address } = await createUser();
  const user = new User({
    name,
    email,
    password,
    address,
  });
  await user.save();
  return user;
}

async function get(id) {
  return User.findById(id).populate("rewards").populate("tasks");
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
  user.events.push(eId);
  await redeemReward(user.address, eId);
  const reward = await Event.findById(eId);
  reward.count += 1;
  await user.save();
  await reward.save();
}

async function getAvailableUserEvents(uId, type) {
  const user = await User.findById(uId);
  const tasks = await Event.find({ type: type });
  const availableTasks = [];
  for (const task of tasks) {
    if (!user.tasks.includes(task._id)) {
      availableTasks.push(task);
    }
  }
  return availableTasks;
}

module.exports = {
  create,
  remove,
  get,
  getAll,
  addEvent,
  getAvailableUserEvents,
};
