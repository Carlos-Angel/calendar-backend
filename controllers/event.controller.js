const { request, response } = require('express');
const debug = require('debug')('calendar:event');
const Event = require('../models/Event.model');

const getEvents = async (req = request, res = response, next) => {
  try {
    const events = await Event.find({ user: req.user.uid }).populate(
      'user',
      'name',
    );
    return res.json({
      ok: true,
      msg: 'events listed',
      events,
    });
  } catch (error) {
    debug(error.message);

    return res.status(500).json({
      ok: false,
      msg: 'internal server error',
    });
  }
};

const getEvent = (req = request, res = response, next) => {
  return res.json({ ok: true, msg: 'getEvent' });
};

const addEvent = async (req = request, res = response, next) => {
  const event = req.body;
  event.user = req.user.uid;
  try {
    const addEvent = new Event(event);
    await addEvent.save();

    return res.status(200).json({
      ok: true,
      msg: 'event created',
      event: addEvent,
    });
  } catch (error) {
    debug(error.message);

    return res.status(500).json({
      ok: false,
      msg: 'internal server error',
    });
  }
};

const updateEvent = (req = request, res = response, next) => {
  return res.json({ ok: true, msg: 'updateEvent' });
};

const deleteEvent = (req = request, res = response, next) => {
  return res.json({ ok: true, msg: 'deleteEvent' });
};

module.exports = {
  getEvents,
  getEvent,
  addEvent,
  updateEvent,
  deleteEvent,
};
