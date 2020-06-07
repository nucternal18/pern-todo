require('dotenv').config();
const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.USER,
  password: '',
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
});

module.exports = pool;

