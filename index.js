const { app } = require('./config/express');
const { createTables } = require('./config/dynamo_database');

const port = process.env.PORT || 4000;

(async () => {
  createTables();

  app.listen(port);
  console.log(`http://localhost:${port}`);
})();
