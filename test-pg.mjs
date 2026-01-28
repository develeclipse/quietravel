import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 1,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 10000,
});

pool.on('connect', () => {
  console.log('✅ Connesso al DB');
});

pool.on('error', (err) => {
  console.log('❌ Errore pool:', err.message);
});

try {
  const res = await pool.query('SELECT count(*) as count FROM quiettravel.qt_destinations');
  console.log('Destinazioni:', res.rows[0].count);
  await pool.end();
} catch (e) {
  console.log('Errore query:', e.message);
  await pool.end();
  process.exit(1);
}
