const express = require('express');
const errors = require('./errors');

const handleError = (err, res) => {
  let error = err;
  switch (err.constructor) {
    case errors.Conflict:
    case errors.InternalServer:
    case errors.UnprocessableEntity:
      res.status(error.statusCode);
      break;
    default:
      console.log({
        error: err.message,
        stack: err.stack,
      });
      error = new errors.InternalServer();
      res.status(error.statusCode);
      break;
  }
  res.json(error.toJSON());
};

const wrapRequest = (req) => {
  req.body = req.body || {};
  req.query = req.query || {};
  req.params = req.params || {};
  return req;
};

const wrapResponse = (res) => {
  res.success = (body = null, status = 200) => {
    res.status(status);
    if (body) {
      res.json(body);
    } else {
      res.end();
    }
  };

  res.created = (body = null) => {
    res.success(body, 201);
  };

  res.noContent = (body = null) => {
    res.success(body, 204);
  };

  return res;
};

const asyncHandlers = handlers => async (req, res) => {
  req = wrapRequest(req);
  res = wrapResponse(res);
  try {
    for (let i = 0; i < handlers.length; i += 1) {
      await handlers[i](req, res);
    }
  } catch (err) {
    handleError(err, res);
  }
};

const Router = () => {
  const router = express.Router();

  ['get', 'post', 'put', 'patch', 'delete'].forEach((name) => {
    const originalMethod = router[name];
    router[name] = function (path, ...handlers) {
      originalMethod.call(router, path, asyncHandlers(handlers));
    };
  });

  return router;
};

module.exports = Router;
