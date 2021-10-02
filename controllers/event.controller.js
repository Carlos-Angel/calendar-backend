const { request, response } = require('express');
const debug = require('debug')('calendar:event');

const getEvents = (req = request, res = response, next) => {
  return res.json({ ok: true, msg: 'getEvents' });
};

const getEvent = (req = request, res = response, next) => {
  return res.json({ ok: true, msg: 'getEvent' });
};

const addEvent = (req = request, res = response, next) => {
  return res.json({ ok: true, msg: 'addEvent' });
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
