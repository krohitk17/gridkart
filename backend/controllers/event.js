const Event = require("../models/event");

const { createReward } = require("../web3/rewards.js");
const { createTask } = require("../web3/tasks.js");

async function create(type, description, amount, image) {
  const event = new Event({
    type,
    description,
    amount,
    image,
  });
  await event.save();
  if (type === "reward") {
    await createReward(String(event._id), amount);
  } else {
    await createTask(String(event._id), amount);
  }

  return event;
}

async function disable(id) {
  const event = await Event.findById(id);
  event.disabled = true;
  await event.save();
  return event;
}

async function get(id) {
  return Event.findById(id);
}

async function getAll(type) {
  return Event.find({ type: type });
}

module.exports = {
  create,
  disable,
  get,
  getAll,
};
