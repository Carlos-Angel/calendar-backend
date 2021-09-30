const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const debug = require('debug')('calendar:auth');
const User = require('../models/User.model');

const signIn = async (req = request, res = response, next) => {
  const user = new User(req.body);
  try {
    const existEmail = await User.findOne({ email: user.email });

    if (existEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'email or password not valid',
      });
    }

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);

    await user.save();
  } catch (error) {
    debug(error.message);
    return res.status(500).json({
      ok: false,
      msg: 'internal server error',
    });
  }

  // TODO: generar token

  res.json({
    ok: true,
    msg: 'user created',
    data: user,
  });
};

const login = async (req = request, res = response, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'email or password not valid',
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'email or password not valid',
      });
    }

    // TODO: generar token

    return res.json({
      ok: true,
      msg: 'login successfully',
      uid: user._id,
      name: user.name,
    });
  } catch (error) {
    debug(error.message);
    return res.status(500).json({
      ok: false,
      msg: 'internal server error',
    });
  }
};

const resetToken = (req = request, res = response, next) => {
  res.json({ msg: 'reset token' });
};

module.exports = {
  signIn,
  login,
  resetToken,
};
