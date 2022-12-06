const debug = require('debug')('calendar:app');
const express = require('express');
const cors = require('cors');
const { port } = require('./config');
const connectionDB = require('./lib/mongo');
const auth = require('./routes/auth');
const event = require('./routes/events');
const { swaggerDocs } = require('./routes/swagger');

const app = express();
app.use(cors());

/** middlewares */
app.use(express.json());

/** routes */
app.use('/api/auth', auth);
app.use('/api/events', event);

/** docs */
app.get('/', (req, res) => res.redirect('/api/docs'));
swaggerDocs(app);

app.listen(port, async () => {
  await connectionDB();
  debug(`server listening on port ${port}`);
});
