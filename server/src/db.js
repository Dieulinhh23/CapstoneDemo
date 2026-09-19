import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('render.com') ? { rejectUnauthorized: false } : false,
});

export async function testDbConnection() {
  const result = await pool.query('SELECT NOW()');
  return result.rows[0];
}

export const query = (text, params) => pool.query(text, params);

export default pool;
