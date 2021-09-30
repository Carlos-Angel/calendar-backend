const { isDev, mongo } = require("../config");
const mongoose = require("mongoose");
const debug = require("debug")("calendar:db");

const USER = encodeURIComponent(mongo.user);
const PASSWORD = encodeURIComponent(mongo.password);

let mongoUri = `mongodb+srv://${USER}:${PASSWORD}@${mongo.host}/${mongo.database}?retryWrites=true&w=majority`; // prettier-ignore

if (isDev) {
  mongoUri = `mongodb://localhost:27017/${mongo.database}`;
}

const connectionDB = async () => {
  try {
    mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    debug(`database ${mongo.database} connected`);
  } catch (error) {
    return error;
  }
};

module.exports = connectionDB;
