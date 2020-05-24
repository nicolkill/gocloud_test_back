const util = require('util');

const errors = require('../../config/errors');
const { getDocumentInstance } = require('../../config/dynamo_database');

const dynamodbDocumentInstance = getDocumentInstance();
const TABLE = "Subscriptions";
const get = util.promisify(dynamodbDocumentInstance.get.bind(dynamodbDocumentInstance));
const put = util.promisify(dynamodbDocumentInstance.put.bind(dynamodbDocumentInstance));
const scan = util.promisify(dynamodbDocumentInstance.scan.bind(dynamodbDocumentInstance));

const getSubscriptions = async () => {
  const params = {
    TableName: TABLE,
  };

  const data = await scan(params);
  return data.Items;
};

const insertSubscription = async ({ name, phone, email, rut}) => {
  let params = {
    TableName: TABLE,
    Key:{
      "email": email,
      "name": name,
    }
  };

  let data = await get(params);
  if (data.Item) {
    throw new errors.Conflict();
  }

  params = {
    TableName: TABLE,
    Item: {
      "email": email,
      "name": name,
      info: {
        "phone": phone,
        "rut": rut,
      },
    },
  };

  try {
    data = await put(params);

    return data
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getSubscriptions,
  insertSubscription,
};
