import pg from "pg";
import "dotenv/config";

async function main() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const res = await pool.query(
    "SELECT table_schema, table_name FROM information_schema.tables WHERE table_schema = 'quiettravel' ORDER BY table_name"
  );
  console.log("Tables in 'quiettravel' schema:");
  console.log(res.rows);
  await pool.end();
}

main();
