const Event = require("../models/event");

const { createEvent } = require("../web3/rewards.js");

async function create(type, description, amount) {
  const event = new Event({
    type,
    description,
    amount,
  });
  await event.save();
  await createEvent(event._id, amount);
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

async function getAll() {
  return Event.find();
}

module.exports = {
  create,
  disable,
  get,
  getAll,
};
