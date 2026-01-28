import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 5000,
});

async function main() {
  console.log('Tentativo di connessione...');
  try {
    const client = await pool.connect();
    console.log('✅ Connesso!');
    const res = await client.query('SELECT count(*) FROM quiettravel.qt_destinations');
    console.log('Count:', res.rows[0].count);
    client.release();
    await pool.end();
  } catch (e) {
    console.log('❌ Errore:', e.code, e.message);
    await pool.end();
    process.exit(1);
  }
}

main();
