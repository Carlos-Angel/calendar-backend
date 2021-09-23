const express = require('express');
const { port } = require('./config');

const app = express();

app.get('/', (req, res) => {
  res.json({ hello: 'calendar backend' });
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
