const { request, response } = require('express');
const debug = require('debug')('calendar:auth');
const User = require('../models/User.model');

const signIn = async (req = request, res = response, next) => {
  const user = new User(req.body);
  try {
    await user.save();
  } catch (error) {
    debug(error.message);
    return res.status(500).json({
      ok: false,
      msg: 'internal server error'
    });
  }
  res.json({
    ok: true,
    msg: 'user created'
  });
};

const login = (req = request, res = response, next) => {
  res.json({ msg: 'login' });
};

const resetToken = (req = request, res = response, next) => {
  res.json({ msg: 'reset token' });
};

module.exports = {
  signIn,
  login,
  resetToken,
};
