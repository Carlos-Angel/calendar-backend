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

const getEvent = async (req = request, res = response, next) => {
  const eventId = req.params.id;
  try {
    const event = await Event.findOne({
      _id: eventId,
      user: req.user.uid,
    });

    return res.json({
      ok: true,
      msg: 'event found',
      event,
    });
  } catch (error) {
    debug(error.message);

    return res.status(500).json({
      ok: false,
      msg: 'internal server error',
    });
  }
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

const updateEvent = async (req = request, res = response, next) => {
  const eventId = req.params.id;
  const user = req.user;
  const data = req.body;
  try {
    const event = await Event.findOne({ _id: eventId, user: user.uid });

    if (!event) {
      return res.status(404).json({ ok: false, msg: 'event not found' });
    }

    const eventUpdated = await Event.findByIdAndUpdate(eventId, data, {
      new: true,
    });

    return res.json({ ok: true, msg: 'event updated', event: eventUpdated });
  } catch (error) {
    debug(error.message);
    return res.status(500).json({
      ok: false,
      msg: 'internal server error',
    });
  }
};

const deleteEvent = async (req = request, res = response, next) => {
  const eventId = req.params.id;
  const user = req.user;
  try {
    const event = await Event.findOne({ _id: eventId, user: user.uid });

    if (!event) {
      return res.status(404).json({ ok: false, msg: 'event not found' });
    }

    await Event.findByIdAndDelete(eventId);

    return res.json({ ok: true, msg: 'event removed' });
  } catch (error) {
    debug(error.message);
    return res.status(500).json({
      ok: false,
      msg: 'internal server error',
    });
  }
};

module.exports = {
  getEvents,
  getEvent,
  addEvent,
  updateEvent,
  deleteEvent,
};
