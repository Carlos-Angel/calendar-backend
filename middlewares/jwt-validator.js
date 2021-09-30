const { response } = require('express');
const { compareJwt } = require('../helpers/jwt');

const jwtValidator = async (req, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'token is required',
    });
  }

  try {
    const { uid, name } = await compareJwt(token);

    req.user = { uid, name };
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'token not valid',
    });
  }
  next();
};

module.exports = {
  jwtValidator,
};
