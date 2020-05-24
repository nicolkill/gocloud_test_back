const AWS = require("aws-sdk");
const util = require('util');

const endpoint = process.env.DYNAMODB_URL || 'http://localhost:8000';

AWS.config.update({
  region: "us-west-2",
  endpoint: endpoint,
});

const dynamodb = new AWS.DynamoDB();
const createTable = util.promisify(dynamodb.createTable.bind(dynamodb));

const SUBSCRIPTIONS_PARAMS = {
  TableName : "Subscriptions",
  KeySchema: [
    { AttributeName: "email", KeyType: "HASH" },
    { AttributeName: "name", KeyType: "RANGE"},
  ],
  AttributeDefinitions: [
    { AttributeName: "name", AttributeType: "S"},
    { AttributeName: "email", AttributeType: "S" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

const createTables = async () => {
  console.log('Creating tables');
  try {
    const data = await Promise.all([
      createTable(SUBSCRIPTIONS_PARAMS),
    ]);
    console.log('created');
  } catch (err) {
    console.log(err);
    if (err.code != 'ResourceInUseException') {
      throw err;
    }
  }
};

const getDocumentInstance = () => new AWS.DynamoDB.DocumentClient();

module.exports = {
  createTables,
  getDocumentInstance,
};
