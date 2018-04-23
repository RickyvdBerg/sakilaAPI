const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'vhgocyppdqcjwj',
  host: 'ec2-54-75-239-237.eu-west-1.compute.amazonaws.com',
  database: 'ddat6p88mjeodj',
  password: 'a5ff7bd24eec6542c2bd372f12d53c8edc45209ab25740be9d52ced35cf696e0',
  port: 5432,
})

module.exports = pool;