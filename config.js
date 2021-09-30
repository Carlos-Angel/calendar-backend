require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  isDev: process.env.NODE_ENV !== 'production',
  mongo: {
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    host: process.env.MONGO_HOST,
    database: process.env.MONGO_NAME,
  },
};
