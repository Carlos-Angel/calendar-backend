const { request, response } = require('express');

const signIn = (req = request, res = response, next) => {
  res.json({ msg: ' sign in' });
};

const login = (req = request, res = response, next) => {
  res.json({ msg: 'login' });
};

const resetToken = (req = request, res = response, next) => {
  res.json({msg: 'reset token'})
}

module.exports = {
  signIn,
  login,
  resetToken
};
