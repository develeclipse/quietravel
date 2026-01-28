import pg from 'pg';
const { Pool } = pg;

const urls = [
  process.env.DATABASE_URL,
  process.env.DIRECT_URL,
  "postgresql://postgres.vzwecagxbfukfrbnkuzw:MediFlow2026%21Secure@aws-1-eu-central-1.vzwecagxbfukfrbnkuzw.db.supabase.co:5432/postgres",
  "postgresql://postgres:MediFlow2026!Secure@db.vzwecagxbfukfrbnkuzw.supabase.co:5432/postgres",
];

async function test() {
  for (const url of urls) {
    if (!url) continue;
    const pool = new Pool({ 
      connectionString: url,
      connectionTimeoutMillis: 3000,
    });
    try {
      const res = await pool.query('SELECT 1');
      console.log('✅ SUCCESS:', url.substring(0, 80));
      await pool.end();
      return;
    } catch (e) {
      console.log('❌', e.code, '-', url.substring(0, 80));
      await pool.end();
    }
  }
}

test();
