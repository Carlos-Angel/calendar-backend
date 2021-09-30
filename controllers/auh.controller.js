const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const debug = require('debug')('calendar:auth');
const User = require('../models/User.model');
const { generateJwt } = require('../helpers/jwt');

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

    const token = await generateJwt(user._id, user.name);

    return res.json({
      ok: true,
      msg: 'user created',
      token,
    });
  } catch (error) {
    debug(error.message);
    return res.status(500).json({
      ok: false,
      msg: 'internal server error',
    });
  }
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

    const token = await generateJwt(user._id, user.name);

    return res.json({
      ok: true,
      msg: 'login successfully',
      token,
    });
  } catch (error) {
    debug(error.message);
    return res.status(500).json({
      ok: false,
      msg: 'internal server error',
    });
  }
};

const resetToken = async (req = request, res = response, next) => {
  const { uid, name } = req.user;
  try {
    const token = await generateJwt(uid, name);

    return res.json({
      ok: true,
      msg: 'reset token',
      token,
    });
  } catch (error) {
    debug(error.message);
    return res.status(500).json({
      ok: false,
      msg: 'internal server error',
    });
  }
};

module.exports = {
  signIn,
  login,
  resetToken,
};
