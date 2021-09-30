const { request, response } = require('express');
const { validationResult } = require('express-validator');

const signIn = (req = request, res = response, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  res.json({ msg: ' sign in' });
};

const login = (req = request, res = response, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

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
