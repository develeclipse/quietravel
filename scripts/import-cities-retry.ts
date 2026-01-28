import * as fs from "fs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  max: 2,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 10000,
});
pool.on("connect", (client) => {
  client.query("SET search_path TO quiettravel");
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

interface CityData {
  comune_nome: string;
  prov_norm: string;
  REGIONE: string;
  POP_RES: string;
  QUIET_SCORE: string;
}

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log("📂 Caricamento dati città...");

  const data = JSON.parse(fs.readFileSync("/tmp/cities-data.json", "utf-8"));
  const cities: CityData[] = data.cities;

  console.log(`✅ ${cities.length} città caricate`);

  const quietCities = cities.filter((city) => {
    const qScore = parseFloat(city.QUIET_SCORE);
    const pop = parseInt(city.POP_RES || "0");
    return !isNaN(qScore) && qScore >= 8 && pop >= 3000 && city.comune_nome;
  });

  console.log(`🎯 ${quietCities.length} città quiet (Q-Score >= 8, pop >= 3000)`);

  quietCities.sort((a, b) => parseFloat(b.QUIET_SCORE) - parseFloat(a.QUIET_SCORE));
  const toImport = quietCities.slice(0, 100);

  console.log(`\n💾 Import di ${toImport.length} città in corso...`);

  let imported = 0;
  let failed = 0;
  let skipped = 0;

  for (const city of toImport) {
    const slug = city.comune_nome
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    let retries = 3;
    let success = false;

    while (retries > 0 && !success) {
      try {
        await prisma.destination.upsert({
          where: { slug },
          update: {},
          create: {
            slug,
            name: city.comune_nome,
            subtitle: `Comune quiet ${city.prov_norm}`,
            region: city.REGIONE,
            province: city.prov_norm || city.REGIONE,
            description: `${city.comune_nome} è un comune ${city.REGIONE.toLowerCase()} con un eccellente Quiet Score di ${city.QUIET_SCORE}, ideale per chi cerca tranquillità e autenticità.`,
            quietScore: Math.round(parseFloat(city.QUIET_SCORE) * 10),
            featured: imported < 20,
          },
        });
        success = true;
        imported++;
        console.log(`  ✓ ${imported}. ${city.comune_nome}`);
      } catch (error: any) {
        if (error.code === 'ECONNREFUSED' || error.message.includes('connection')) {
          retries--;
          console.log(`  ⚠️ Retry ${3-retries}/3 per ${city.comune_nome}...`);
          await delay(2000);
        } else if (error.message?.includes('P2002')) {
          success = true;
          skipped++;
        } else {
          console.error(`  ✗ ${city.comune_nome}: ${error.message}`);
          retries = 0;
          failed++;
        }
      }
    }
  }

  console.log(`\n✅ Import completato!`);
  console.log(`  📥 ${imported} città importate`);
  console.log(`  ⏭️  ${skipped} già esistenti`);
  console.log(`  ❌ ${failed} fallite`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
