const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

require('../app/subscriptions/subscriptions.route').route(app);

module.exports = {
  app,
};
