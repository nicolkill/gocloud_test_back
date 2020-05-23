const controller = require('./subscriptions.controller');

const route = (app) => {
  app.post('/landing/subscriptions', controller.postSubscriptions);
};

module.exports = {
  route,
};
