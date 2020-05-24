const {
  getSubscriptions,
  insertSubscription,
} = require('./subscriptions.data_storage');
const validator = require('../../config/validator');

const getAllSubscriptions = async (req, res) => {
  const data = await getSubscriptions();

  res.created({
    data
  });
};

const postSubscriptions = async (req, res) => {
  let data = req.body;

  validator.validate(data, {
    name: [validator.ValidationTypes.Exist, validator.ValidationTypes.Name],
    phone: [validator.ValidationTypes.Exist, validator.ValidationTypes.Phone],
    email: [validator.ValidationTypes.Exist, validator.ValidationTypes.Email],
    rut: [validator.ValidationTypes.Exist, validator.ValidationTypes.Nut],
  });

  await insertSubscription(data);

  res.noContent();
};

module.exports = {
  getAllSubscriptions,
  postSubscriptions,
};
