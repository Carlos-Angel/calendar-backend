const util = require('util');
const jwt = require('jsonwebtoken');

const generateJwt = async (uid, name) => {
  const payload = { uid, name };
  const signPromise = util.promisify(jwt.sign);
  try {
    const token = await signPromise(payload, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });
    return token;
  } catch (error) {
    return Promise.reject(err);
  }
};

const compareJwt = async (token) => {
  const verifyPromise = util.promisify(jwt.verify);
  const payload = await verifyPromise(token, process.env.JWT_SECRET);

  return payload;
};

module.exports = {
  generateJwt,
  compareJwt,
};
