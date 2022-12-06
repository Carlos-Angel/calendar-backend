const debug = require('debug')('calendar:app');
const express = require('express');
const cors = require('cors');
const { port } = require('./config');
const connectionDB = require('./lib/mongo');
const auth = require('./routes/auth');
const event = require('./routes/events');

const app = express();
app.use(cors());

/** middlewares */
app.use(express.json());

/** routes */
app.use('/api/auth', auth);
app.use('/api/events', event);

app.listen(port, async () => {
  await connectionDB();
  debug(`server listening on port ${port}`);
});
