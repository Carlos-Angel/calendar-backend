const express = require('express');
const { port } = require('./config');

const app = express();

app.use(express.static('public' ));

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
