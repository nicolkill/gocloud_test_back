const { app } = require('./config/express');
const { createTables } = require('./config/dynamo_database');

createTables();

app.listen(4000);
console.log('http://localhost:4000');
