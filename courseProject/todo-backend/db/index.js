import { Pool } from 'pg';
const databaseUser = process.env.DATABASE_USERNAME;
if (!databaseUser) throw new Error('Username not specified for database.');
const databasePassword = process.env.DATABASE_PASSWORD;
if (!databasePassword) throw new Error('Password not specified for database.');
const databaseHost = process.env.DATABASE_HOST;
if (!databaseHost) throw new Error('Host not specified for database.');
const databasePort = process.env.DATABASE_PORT;
if (!databasePort) throw new Error('Port not specified for database.');
const databaseName = process.env.DATABASE_NAME;
if (!databaseName) throw new Error('Name not specified for database.');

export const pool = new Pool({
  user: databaseUser,
  password: databasePassword,
  host: databaseHost,
  port: parseInt(databasePort),
  database: databaseName,
});

await pool.query(`CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    todo TEXT )`);
