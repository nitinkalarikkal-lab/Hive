
require('dotenv').config();

const { Pool } = require('pg');

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is missing from server/.env');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    const result = await pool.query(
      'SELECT current_database() AS database, NOW() AS server_time'
    );

    console.log('Connected to Neon successfully!');
    console.log('Database:', result.rows[0].database);
    console.log('Server time:', result.rows[0].server_time);
  } catch (error) {
    // Do not print connection details or credentials.
    console.error('Database connection failed:', error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

testConnection();
