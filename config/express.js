const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const Router = require('./router');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  const now = Date.now();

  const chunks = [];
  const oldWrite = res.write;
  const oldEnd = res.end;

  res.write = function (chunk) {
    chunks.push(chunk);

    return oldWrite.apply(res, arguments);
  };

  res.end = function (chunk) {
    if (chunk) {
      chunks.push(chunk);
    }

    let body = '{}';
    const contentType = res.getHeader('content-type');
    if (contentType && contentType.indexOf('application/json') >= 0 && chunks.length > 0) {
      body = Buffer.isBuffer(chunks[0]) ? Buffer.concat(chunks).toString('utf8') : chunks[0];
    }

    try {
      body = JSON.parse(body);
    } catch (error) {
      console.log({
        body,
        error: error.message,
        stack: error.stack,
      });
      body = {};
    }

    console.log({
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: (Date.now() - now) / 1000,
      request: req.body,
      response: body,
    });

    return oldEnd.apply(res, arguments);
  };

  next()
});

const router = Router();

require('../app/subscriptions/subscriptions.route').route(router);

app.use('/', router);

module.exports = {
  app,
};
