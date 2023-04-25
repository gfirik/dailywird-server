const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

const MONGODB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}`;

module.exports = {
  MONGODB_URI,
};
