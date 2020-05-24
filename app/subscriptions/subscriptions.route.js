const {
  getAllSubscriptions,
  postSubscriptions
} = require('./subscriptions.controller');

const route = (router) => {
  router.get('/landing/subscriptions', getAllSubscriptions);
  router.post('/landing/subscriptions', postSubscriptions);
};

module.exports = {
  route,
};
