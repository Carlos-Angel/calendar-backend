const express = require('express');
const { port } = require('./config');
const auth = require('./routes/auth');

const app = express();

app.use(express.static('public' ));

/** middlewares */
app.use(express.json());

/** routes */
app.use('/api/auth', auth)

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
