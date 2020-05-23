const AWS = require("aws-sdk");

const endpoint = process.env.DYNAMODB_URL;

AWS.config.update({
  region: "us-west-2",
  endpoint: endpoint,
});

const createTables = () => {
  const dynamodb = new AWS.DynamoDB();

  const params = {
    TableName : "Subscriptions",
    KeySchema: [
      { AttributeName: "name", KeyType: "RANGE"},
      { AttributeName: "phone", KeyType: "HASH" },
      { AttributeName: "email", KeyType: "HASH" },
      { AttributeName: "rut", KeyType: "HASH" },
    ],
    AttributeDefinitions: [
      { AttributeName: "name", AttributeType: "S"},
      { AttributeName: "phone", AttributeType: "S" },
      { AttributeName: "email", AttributeType: "S" },
      { AttributeName: "rut", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10
    }
  };

  dynamodb.createTable(params, function(err, data) {
    if (err) {
      console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
  });
};

module.exports = {
  createTables
};
