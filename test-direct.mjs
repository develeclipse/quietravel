import pg from 'pg';
const { Pool } = pg;

// URL diretto Supabase (senza pooler)
const directUrl = "postgresql://postgres:MediFlow2026!Secure@db.vzwecagxbfukfrbnkuzw.supabase.co:5432/postgres";

const pool = new Pool({
  connectionString: directUrl,
  connectionTimeoutMillis: 8000,
});

async function main() {
  console.log('Tentativo con URL diretto...');
  try {
    const client = await pool.connect();
    console.log('✅ Connesso!');
    const res = await client.query('SELECT count(*) FROM quiettravel.qt_destinations');
    console.log('Destinazioni:', res.rows[0].count);
    client.release();
    await pool.end();
  } catch (e) {
    console.log('❌ Errore:', e.code || 'unknown', '-', e.message?.substring(0, 100));
    await pool.end();
  }
}

main();
