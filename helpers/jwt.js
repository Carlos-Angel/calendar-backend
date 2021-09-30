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

module.exports = {
  generateJwt,
};
