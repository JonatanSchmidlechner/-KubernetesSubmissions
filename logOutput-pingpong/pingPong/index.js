import express from 'express';
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

const app = express();
const port = process.env.PORT || 3001;

const pool = new Pool({
  user: databaseUser,
  password: databasePassword,
  host: databaseHost,
  port: databasePort,
  database: databaseName,
});

let pingCount = 0;

const initDB = async () => {
  while (true) {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS pingCount (
          count INT DEFAULT 0
        );
      `);
      const res = await pool.query(`SELECT count FROM pingCount LIMIT 1`);
      if (res.rows.length === 0) {
        await pool.query(`INSERT INTO pingCount DEFAULT VALUES`);
      } else {
        pingCount = res.rows[0].count;
      }
      break; // success
    } catch (err) {
      console.log('DB not ready, retrying in 5s...');
      await new Promise((r) => setTimeout(r, 5000));
    }
  }
};

app.get('/', async (req, res) => {
  pingCount++;
  try {
    const result = await pool.query('UPDATE pingCount SET count = count + 1');
    res.status(200).send({ pings: pingCount });
  } catch (error) {
    console.log(error);
    res.status(500).send('Could not update pingCount');
  }
});

app.get('/pings', (req, res) => {
  res.json({ pings: pingCount });
});

app.get('/healthz', async (req, res) => {
  try {
    const result = await pool.query('SELECT 1');
    return res.status(200).send();
  } catch (error) {
    return res.status(500).json({ message: 'Could not connect to database.' });
  }
});

app.listen(port, () => {
  console.log(`App listening to Port: ${port}`);
});

initDB();
