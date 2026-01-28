import * as fs from "fs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Setup Prisma con schema quiettravel
const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});
pool.on("connect", (client) => {
  client.query("SET search_path TO quiettravel");
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

interface CityData {
  year: string;
  COD_PROV: string;
  prov_norm: string;
  REGIONE: string;
  codice_istat_comune: string;
  comune_nome: string;
  POP_RES: string;
  KM2_COM_TERR: string;
  QUIET_SCORE: string;
}

async function main() {
  console.log("📂 Caricamento dati città...");

  const data = JSON.parse(fs.readFileSync("/tmp/cities-data.json", "utf-8"));
  const cities: CityData[] = data.cities;

  console.log(`✅ ${cities.length} città caricate`);

  // Filtro solo città con Q-Score alto e popolazione > 3000
  const quietCities = cities.filter((city) => {
    const qScore = parseFloat(city.QUIET_SCORE);
    const pop = parseInt(city.POP_RES || "0");
    return !isNaN(qScore) && qScore >= 8 && pop >= 3000 && city.comune_nome;
  });

  console.log(`🎯 ${quietCities.length} città quiet trovate (Q-Score >= 8/10, pop >= 3000)`);

  // Sort by Q-Score descending
  quietCities.sort((a, b) => parseFloat(b.QUIET_SCORE) - parseFloat(a.QUIET_SCORE));

  // Take top 100
  const top100 = quietCities.slice(0, 100);

  console.log(`\n📋 Top 10 città quiet:`);
  top100.slice(0, 10).forEach((city, i) => {
    console.log(`${i + 1}. ${city.comune_nome} (${city.REGIONE}) - Q-Score: ${city.QUIET_SCORE}`);
  });

  console.log(`\n💾 Importazione in database...`);

  let imported = 0;
  let skipped = 0;

  for (const city of top100) {
    try {
      const slug = city.comune_nome
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove accents
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      await prisma.destination.upsert({
        where: { slug },
        update: {},
        create: {
          slug,
          name: city.comune_nome,
          subtitle: `Comune quiet ${city.prov_norm}`,
          region: city.REGIONE,
          province: city.prov_norm || city.REGIONE,
          description: `${city.comune_nome} è un comune ${city.REGIONE.toLowerCase()} con un eccellente Quiet Score di ${
            city.QUIET_SCORE
          }, ideale per chi cerca tranquillità e autenticità. Con ${parseInt(city.POP_RES || "0").toLocaleString()} abitanti, offre un'esperienza lontana dal turismo di massa.`,
          quietScore: Math.round(parseFloat(city.QUIET_SCORE) * 10), // Convert 1-10 to 10-100
          featured: imported < 20, // First 20 as featured
        },
      });

      if ((imported + skipped) % 10 === 0) {
        console.log(`  ✓ ${imported} importate, ${skipped} saltate...`);
      }
    } catch (error: any) {
      console.error(`  ✗ Errore con ${city.comune_nome}:`, error.message);
    }
  }

  console.log(`\n✅ Importazione completata!`);
  console.log(`  📥 Importate: ${imported}`);
  console.log(`  ⏭️  Saltate (già esistenti): ${skipped}`);
}

main()
  .catch((e) => {
    console.error("❌ Errore:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
