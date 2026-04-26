import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

export const connectDatabase = async () => {
  try {
    const client = await pool.connect();
    console.log('Database connection successful');
    client.release();
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};

export default pool;
