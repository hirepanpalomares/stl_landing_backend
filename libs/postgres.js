const { Client } = require('pg');

// normal connection, without the pool

async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'nico',
    password: 'admin123',
    database: 'my_store'
  });
  await client.connect();
  return client;
}

module.exports = getConnection;
