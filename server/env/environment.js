require('dotenv').config();

const cosmosPort = process.env.COSMOS_PORT;
const dbName = process.env.DB_NAME;
const key = process.env.KEY;

module.exports = {
  cosmosPort,
  dbName,
  key
};