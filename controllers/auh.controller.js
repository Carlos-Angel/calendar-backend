const { request, response } = require('express');
const debug = require('debug')('calendar:auth');
const User = require('../models/User.model');

const signIn = async (req = request, res = response, next) => {
  const user = new User(req.body);
  try {
    const existEmail = await User.findOne({email: user.email});

    if(existEmail){
      return res.status(400).json({
        ok: false,
        msg: 'email or password not valid',
      });
    }


    await user.save();
  } catch (error) {
    debug(error.message);
    return res.status(500).json({
      ok: false,
      msg: 'internal server error',
    });
  }
  res.json({
    ok: true,
    msg: 'user created',
    data: user
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
